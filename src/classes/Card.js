import cardsConfig from '../constants/cards.json';
import Mechanic from './Mechanic';
import { fetchCardMeta, fetchCardStats } from '../services/cardService';
import CardSlot from './CardSlot';
import { mergeErrorMessages } from '../services/utils';
import { isLocationCard } from './matchers';
import { registerCardTypeConstructor, getCardTypeConstructor, setDefaultCardType } from './Registry';

export default class Card {

  static async getInstance(id, level = 1) {
    const cardMeta = await fetchCardMeta(id, level);
    return new (Card.getTypeConstructor(cardMeta.stats.type))({
      id,
      metadataId: cardMeta.metadata.id,
      level,
      ...cardMeta.stats,
    });
  }

  static getLeveledInstance(id, card, level = undefined) {
    if (!level) {
      level = card.level + 1;
    }
    const stats = fetchCardStats(card.metadataId, level);
    return new (Card.getTypeConstructor(stats.type))({
      id,
      metadataId: card.metadataId,
      level,
      ...stats,
    });
  }

  constructor(data) {
    Object.assign(this, data);

    this.dropSlots = [];
    this.stackedCards = [this];
    this.active = false;
    this.parent = null;
    this.minDropSlots = cardsConfig.locationMinSlots;
    this.minEmptyDropSlots = 2;

    this.additionalBonuses = {
      funds: { absolute: 0, relative: 0 },
      development: { absolute: 0, relative: 0 },
      experience: { absolute: 0, relative: 0 },
      fundsPerBlock: { absolute: 0, relative: 0 },
      power: { absolute: 0, relative: 0 },
    };

    if (!Array.isArray(this.mechanics)) {
      this.mechanics = [];
    }

    this.mechanics = this.mechanics.map(({ name, params }) => {
      return Mechanic.getInstance(name, this, params);
    }).concat([
      Mechanic.getInstance('cost', this, ['level']),
      Mechanic.getInstance('core', this, ['funds']),
      Mechanic.getInstance('core', this, ['development']),
      Mechanic.getInstance('bonus', this, ['funds', true]),
      Mechanic.getInstance('bonus', this, ['development']),
      Mechanic.getInstance('bonus', this, ['experience']),
      Mechanic.getInstance('bonus', this, ['fundsPerBlock']),
    ]);
  }

  changeBonuses(state, bonusesObject) {
    state = this._on('onBeforeChangeBonuses', state);

    for (const stat of Object.keys(bonusesObject)) {
      this.additionalBonuses[stat].absolute += bonusesObject[stat].absolute;
      this.additionalBonuses[stat].relative += bonusesObject[stat].relative;
    }

    return this._on('onAfterChangeBonuses', state);
  }

  getBonusStatValue(stat) {
    const baseBonus = this.bonus && this.bonus[stat] ? this.bonus[stat] : 0;
    const absBonus = this.additionalBonuses[stat].absolute;
    const relativeBonus = this.additionalBonuses[stat].relative;

    return (baseBonus + absBonus) * (1 + relativeBonus);
  }

  addNewDropSlot(SlotType = CardSlot) {
    this.dropSlots.push(new SlotType(this));
  }

  removeDropSlot(dropSlot) {
    if (this.dropSlots.length > this.minDropSlotLength) {
      this.dropSlots.splice(this.dropSlots.indexOf(dropSlot), 1);
    }
  }

  findParent(selector = isLocationCard) {
    let card = this;
    while (card && !selector(card)) {
      card = card.parent;
    }
    return card;
  }

  _on(action, state, ...params) {
    for (const mechanic of this.mechanics) {
      state = mechanic[action] ? mechanic[action](state, ...params) : state;
    }
    return state;
  }

  _can(method, ...params) {
    const errorMessages = this.mechanics
      .map(mechanic => mechanic[method] ? mechanic[method](...params) : null)
      .filter(errorMessage => errorMessage !== null);

    return mergeErrorMessages(...errorMessages);
  }

  canPlay(state, dropSlot) {
    const result = {};

    if (dropSlot.owner) {
      Object.assign(result, dropSlot.owner.canPlayChild(state, this));
    }

    Object.assign(result, this._can('canPlay', state, dropSlot));

    return result;
  }

  onPlay(state, dropSlot) {
    this.active = true;
    return this._on('onPlay', state, dropSlot);
  }

  canWithdraw(state) {
    return mergeErrorMessages(
      this._can('canWithdraw', state),
      this.parent ? this.parent.canWithdrawChild(state, this) : {},
      ...this.dropSlots.filter(slot => !slot.isEmpty()).map(({ card }) => card.canWithdraw(state))
    );
  }

  onWithdraw(state) {
    let newState = this._on('onWithdraw', state);

    this.additionalBonuses = {
      funds: { absolute: 0, relative: 0 },
      development: { absolute: 0, relative: 0 },
      experience: { absolute: 0, relative: 0 },
      fundsPerBlock: { absolute: 0, relative: 0 },
      power: { absolute: 0, relative: 0 },
    };

    for (const slot of this.dropSlots) {
      newState = slot.removeCard(newState);
    }

    while (this.stackedCards.length) {
      this.stackedCards.pop().active = false;
    }

    return newState;
  }

  canPlayChild(state, child) {
    return this._can('canPlayChild', state, child);
  }

  onPlayChild(state, child) {
    return this._on('onPlayChild', state, child);
  }

  canWithdrawChild(state, child) {
    return this._can('canWithdrawChild', state, child);
  }

  onWithdrawChild(state, child) {
    return this._on('onWithdrawChild', state, child);
  }

  block(state, blockCount) {
    return this._on('block', state, blockCount);
  }

  canLevelUp(state, dropSlot) {
    // this === dragged card
    const droppedCard = dropSlot.card;

    const result = {
      allowed: droppedCard.metadataId === this.metadataId && droppedCard.level < 5,
    };

    if (!result.allowed) return result;

    const instance = Card.getLeveledInstance(this.id, droppedCard);
    result.allowed = state.stats.funds >= instance.cost.funds;

    if (!result.allowed) return result;

    return Object.assign(result, droppedCard._can('canLevelUp', state, dropSlot));
  }

  levelUp(state, dropSlot) {
    // this === dragged card
    const droppedCard = dropSlot.card;

    const leveledUp = Card.getLeveledInstance(this.id, droppedCard);
    leveledUp.dropSlots = droppedCard.dropSlots;
    leveledUp.additionalBonuses = droppedCard.additionalBonuses;
    leveledUp.stackedCards = droppedCard.stackedCards.concat(this);

    for (const cardSlot of leveledUp.dropSlots) {
      cardSlot.owner = leveledUp;
      if (!cardSlot.isEmpty()) {
        cardSlot.card.parent = leveledUp;
      }
    }

    // optional add on level up || add on child level up

    return leveledUp;
  }
}

Card.registerTypeConstructor = registerCardTypeConstructor;
Card.getTypeConstructor = getCardTypeConstructor;

setDefaultCardType(Card);
