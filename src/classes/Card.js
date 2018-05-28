import Mechanic from './Mechanic';
import { fetchCardMeta } from '../services/cardService';
import CardSlot from './CardSlot';
import CoreMechanic from './mechanics/CoreMechanic';

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
      new CoreMechanic(this, 'funds'),
      new CoreMechanic(this, 'development'),
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

  findParent(CardType = cardTypes.Location) {
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

    if (!dropSlot) {
      return { allowed: false };
    }

    if (!dropSlot.isEmpty()) {
      if (dropSlot.card.id === this.id) {
        return this.canLevelUp(state, dropSlot);
      } else {
        return { allowed: false };
      }
    }

    const result = {};

    // extract this to a level mechanic
    if (this.level > state.stats.level) {
      result.level = true;
    }

    const location = dropSlot.findParent(cardTypes.Location);

    // extract this to a location mechanic
    if (location) {
      if (this.cost.power > location.values.power) {
        result.power = true;
      }
      if (this.cost.space > location.values.space) {
        result.space = true;
      }
    }

    Object.assign(result, this._can('canPlay', state, dropSlot));

    // check if this should be here because it is in _can
    if (result.allowed) {
      result.allowed = !Object.keys(result).some((key) =>
        key !== 'special' && key !== 'allowed' && result[key] !== true);
    }

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
    const result = { allowed: this.level < 5 };

    if (!result.allowed) return result;

    const instance = await Card.getInstance(this.id, this.level + 1);
    result.allowed = state.stats.funds >= instance.cost.funds;

    if (!result.allowed) return result;

    return Object.assign(result, this._can('canLevelUp', state, dropSlot));
  }

  async levelUp(state, dropSlot, draggedCard) {
    const leveledUp = await Card.getInstance(this.id, this.level + 1);
    leveledUp.dropSlots = this.dropSlots;
    leveledUp.stackedCards = this.stackedCards.concat(draggedCard.id);

    for (const cardSlot of this.dropSlots) {
      cardSlot.owner = leveledUp;
      if (!cardSlot.isEmpty()) {
        cardSlot.card.parent = leveledUp;
      }
    }

    leveledUp.onPlay(this.onWithdraw(state), dropSlot);
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
