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

  block(state, blockCount) {
    for (const mechanic of this.mechanics) {
      state = mechanic.block(state, blockCount);
    }
    return state;
  }

}
