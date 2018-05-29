import config from '../constants/config.json';
import cardConfig from '../constants/cards.json';
import levels from '../constants/levels.json';
import LocationCardSlot from './SlotTypes/LocationCardSlot';
import ProjectCardSlot from './SlotTypes/ProjectCardSlot';
import './mechanics';

export default class Gameplay {

  constructor(blockNumber) {
    this.allCards = [];
    this.playedCards = [];
    this.handCards = [];
    this.blockNumber = blockNumber;
    this.stats = {
      level: config.globalStats.level,
      experience: config.globalStats.experience,
      earnedXp: 0,
      requiredXp: levels[1].change,
      funds: config.globalStats.funds,
      development: config.globalStats.development,
    };
    this.locationSlots = new Array(cardConfig.locationSlots);
    this.projectSlots = new Array(cardConfig.projectSlots);

    for (let i = 0; i < this.locationSlots.length; i += 1) {
      this.locationSlots[i] = new LocationCardSlot();
    }

    for (let i = 0; i < this.locationSlots.length; i += 1) {
      this.projectSlots[i] = new ProjectCardSlot();
    }
  }

  getCardsOfType(type) {
    return this.playedCards.filter((card) => card instanceof type);
  }

  updateBlockNumber(state, blockNumber) {
    const blockCount = blockNumber - state.blockNumber;

    if (blockCount < 1) return state;

    for (const card of this.playedCards) {
      state = card.block(state, blockCount);
    }

    return {
      ...state,
      funds: state.funds + state.fundsPerBlock * blockCount,
      blockNumber,
    };
  }
}
