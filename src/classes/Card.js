import Mechanic from './Mechanic';
import { getCardMetadata } from '../services/ethereumService';
import { fetchCardStats } from '../services/cardService';

const cardTypes = new Map();

export default class Card {

  static getTypeConstructor(type) {
    if (cardTypes.has(type)) {
      return cardTypes.get(type);
    }
    return Card;
  }

  static registerTypeConstructor(name, constructor) {
    cardTypes.set(name, constructor);
  }

  static async getInstance(id, level = 1) {
    const metadata = await ethService.getCardMetadata(id);
    const stats = fetchCardStats(metadata.id, level);
    return new (this.getTypeConstructor(stats.type))({
      id,
      metadataId: metadata.id,
      level,
      ...stats,
    });
  }

  constructor(data = {}) {
    Object.assign(this, data);

    this.dropSlots = [];
    this.stackedCardIds = [data.id];
    this.active = false;

    if (!Array.isArray(this.mechanics)) {
      this.mechanics = [];
    }

    this.mechanics = this.mechanics.map(({ name, params }) => {
      return Mechanic.getInstance(name, this, params);
    });
  }

  _can(method, ...params) {
    const result = { allowed: true };
    for (const mechanic of this.mechanics) {
      const res = mechanic[method](...params);
      if (res.special) {
        result.special = (result.special || []).concat(res.special);
        delete res.special;
      }
      Object.assign(result, res);
    }
    result.allowed = (res.special && res.special.length) || !Object.keys(result).some((key) => result[key] === false);
    return result;
  }

  canPlay(state, destSlot) {
    return this._can('canPlay', state, destSlot);
  }

  canLevelUp(state, dropSlot) {
    const result = { allowed: this.level < 5 };

    result.allowed = state.stats.funds >= Card.getInstance(this.id, this.level + 1).cost.funds;

    return Object.assign(result, this._can('canLevel', state, dropSlot));
  }

  levelUp(state, dropSlot, draggedCard) {
    const leveldUp = Card.getInstance(this.id, this.level);
    leveldUp.dropSlots = this.dropSlots;
    leveldUp.stackedCards = this.stackedCards.concat(draggedCard.id);

    // do withdraw
    // do play again

    dropSlot.card = leveldUp;
  }

  block(state, blockCount) {
    for (const mechanic of this.mechanics) {
      state = mechanic.block(state, blockCount);
    }
    return state;
  }

}
