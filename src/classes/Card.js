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

  static async getInstance(id) {
    const metadata = await ethService.getCardMetadata(id);
    const stats = fetchCardStats(metadata.id, 1);
    return new (this.getTypeConstructor(stats.type))({
      id,
      metadataId: metadata.id,
      ...stats,
    });
  }

  constructor(data = {}) {
    Object.assign(this, data);

    this.dropSlots = [];
    this.stackedCards = [];
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

  block(state, blockCount) {
    for (const mechanic of this.mechanics) {
      state = mechanic.block(state, blockCount);
    }
    return state;
  }

}
