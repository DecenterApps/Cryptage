import config from '../constants/config.json';
import levels from '../constants/levels.json';

export default class Gameplay {

  constructor() {
    this.allCards = [];
    this.playedCards = [];
    this.handCards = [];
    this.stats = {
      level: config.globalStats.level,
      experience: config.globalStats.experience,
      earnedXp: 0,
      requiredXp: levels[1].change,
      funds: config.globalStats.funds,
      development: config.globalStats.development,
    };
    this.locationSlots = [];
  }

  getCardsOfType(type) {
    return this.playedCards.filter((card) => card instanceof type);
  }

  block(state, blockCount) {
    for (const card of this.playedCards) {
      state = card.block(state, blockCount);
    }
    return state;
  }

  canDrop(card, slot) {
    return card.canDrop(slot);
  }

  dropCard(state, card, slot) {

  }
}
