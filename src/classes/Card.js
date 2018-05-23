import Mechanic from './Mechanic';
import { fetchCardMeta } from '../services/cardService';
import CardSlot from './CardSlot';
import LocationCard from './cardTypes/Location';

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

    if (!Array.isArray(this.mechanics)) {
      this.mechanics = [];
    }

    this.mechanics = this.mechanics.map(({ name, params }) => {
      return Mechanic.getInstance(name, this, params);
    });
  }

  addNewDropSlot(SlotType = CardSlot) {
    this.dropSlots.push(new SlotType(this));
  }

  findParent(CardType = LocationCard) {
    let card = this;
    while (card && !(card instanceof CardType)) {
      card = card.parent;
    }
    return card;
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
    result.allowed = (result.special && result.special.length) || !Object.keys(result).some((key) => result[key] === false);
    return result;
  }

  canPlay(state, destSlot) {
    return this._can('canPlay', state, destSlot);
  }

  async canLevelUp(state, dropSlot) {
    const result = { allowed: this.level < 5 };

    if (!result.allowed) return result;

    const instance = await Card.getInstance(this.id, this.level + 1);
    result.allowed = state.stats.funds >= instance.cost.funds;

    if (!result.allowed) return result;

    return Object.assign(result, this._can('canLevel', state, dropSlot));
  }

  async levelUp(state, dropSlot, draggedCard) {
    const leveledUp = await Card.getInstance(this.id, this.level + 1);
    leveledUp.dropSlots = this.dropSlots;
    leveledUp.stackedCards = this.stackedCards.concat(draggedCard.id);

    for (const cardSlot of this.dropSlots) {
      cardSlot.parent = leveledUp;
      if (!cardSlot.isEmpty()) {
        cardSlot.card.parent = leveledUp;
      }
    }

    dropSlot.dropCard(leveledUp);
  }

  block(state, blockCount) {
    for (const mechanic of this.mechanics) {
      state = mechanic.block(state, blockCount);
    }
    return state;
  }

}
