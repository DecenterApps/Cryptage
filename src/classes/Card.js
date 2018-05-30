import Mechanic from './Mechanic';
import { fetchCardMeta } from '../services/cardService';
import CardSlot from './CardSlot';

const cardTypes = new Map();

export default class Card {

  static registerTypeConstructor(name, constructor) {
    cardTypes.set(name, constructor);
  }

  static getTypeConstructor(type) {
    if (cardTypes.has(type)) {
      return cardTypes.get(type);
    }
    return Card;
  }

  static async getInstance(id, level = 1) {
    const cardMeta = await fetchCardMeta(id, level);
    return new (this.getTypeConstructor(cardMeta.stats.type))({
      id,
      metadataId: cardMeta.metadata.id,
      level,
      ...cardMeta.stats,
    });
  }

  constructor(data) {
    Object.assign(this, data);

    this.dropSlots = [];
    this.stackedCardIds = [data.id];
    this.active = false;
    this.parent = null;
    this.minDropSlots = 6;
    this.minEmptyDropSlots = 2;

    if (!Array.isArray(this.mechanics)) {
      this.mechanics = [];
    }

    this.mechanics = this.mechanics.map(({ name, params }) => {
      return Mechanic.getInstance(name, this, params);
    }).concat([
      Mechanic.getInstance('cost', this, 'level'),
      Mechanic.getInstance('core', this, 'funds'),
      Mechanic.getInstance('core', this, 'development'),
    ]);
  }

  addNewDropSlot(SlotType = CardSlot) {
    this.dropSlots.push(new SlotType(this));
  }

  removeDropSlot(dropSlot) {
    if (this.dropSlots.length > this.minDropSlotLength) {
      this.dropSlots.splice(this.dropSlots.indexOf(dropSlot), 1);
    }
  }

  findParent(CardType = cardTypes.get('Location')) {
    let card = this;
    while (card && !(card instanceof CardType)) {
      card = card.parent;
    }
    return card;
  }

  _on(action, state, ...params) {
    for (const mechanic of this.mechanics) {
      state = mechanic[action](state, ...params);
    }
    return state;
  }

  _can(method, ...params) {
    const result = { allowed: true };

    for (const mechanic of this.mechanics) {
      if (mechanic[method]) {
        const res = mechanic[method](...params);
        if (res.special) {
          result.special = (result.special || []).concat(res.special);
          delete res.special;
        }
        Object.assign(result, res);
      }
    }

    if (result.special && result.special.length > 0 || Object.keys(result).some(
      (key) => key !== 'allowed' && result[key] !== true
    ) === true) {
      result.allowed = false;
    }

    return result;
  }

  async canPlay(state, dropSlot) {
    if (!dropSlot) return { allowed: false };
    if (!dropSlot.isEmpty()) return await this.canLevelUp(state, dropSlot);

    const result = {};

    if (dropSlot.owner) {
      Object.assign(result, dropSlot.owner._can('canPlayChild', state, this));
    }

    Object.assign(result, this._can('canPlay', state, dropSlot));

    return result;
  }

  onPlay(state, dropSlot) {
    return this._on('onPlay', state, dropSlot);
  }

  canWithdraw(state) {
    return this._can('canWithdraw', state);
  }

  onWithdraw(state) {
    return this._on('onWithdraw', state);
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

  async canLevelUp(state, dropSlot) {
    // this === dragged card
    const droppedCard = dropSlot.card;

    const result = {
      allowed: droppedCard.id === this.id && droppedCard.level < 5,
    };

    if (!result.allowed) return result;

    const instance = await Card.getInstance(droppedCard.id, droppedCard.level + 1);
    result.allowed = state.stats.funds >= instance.cost.funds;

    if (!result.allowed) return result;

    return Object.assign(result, droppedCard._can('canLevelUp', state, dropSlot));
  }

  async levelUp(state, dropSlot) {
    // this === dragged card
    const droppedCard = dropSlot.card;

    const leveledUp = await Card.getInstance(droppedCard.id, droppedCard.level + 1);
    leveledUp.dropSlots = droppedCard.dropSlots;
    leveledUp.stackedCards = droppedCard.stackedCards.concat(this.id);

    for (const cardSlot of droppedCard.dropSlots) {
      cardSlot.owner = leveledUp;
      if (!cardSlot.isEmpty()) {
        cardSlot.card.parent = leveledUp;
      }
    }

    // optional add on level up || add on child level up

    return leveledUp;
  }

  block(state, blockCount) {
    state = this._on('block', state, blockCount);
    for (const slot of this.dropSlots) {
      if (!slot.isEmpty()) {
        state = slot.card.block(state, blockCount);
      }
    }
    return state;
  }
}
