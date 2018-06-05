import config from '../constants/config.json';
import cardConfig from '../constants/cards.json';
import levels from '../constants/levels.json';
import LocationCardSlot from './slotTypes/LocationCardSlot';
import ProjectCardSlot from './slotTypes/ProjectCardSlot';
import './mechanics';
import './cardTypes';
import './slotTypes';
import { calculateLevelData } from '../services/gameMechanicsService';

export default class Gameplay {

  constructor(blockNumber) {
    this.cards = [];
    this.blockNumber = blockNumber;
    this.projectExecutionTimePercent = 100;
    this.stats = {
      level: config.globalStats.level,
      experience: config.globalStats.experience,
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
    return this.playedCards.filter(card => card instanceof type);
  }

  updateBlockNumber(state, blockNumber) {
    const blockCount = blockNumber - state.blockNumber;

    if (blockCount < 1) return state;

    for (const card of this.cards) {
      state = card.block(state, blockNumber, blockCount);
    }

    return {
      ...state,
      stats: {
        ...state.stats,
        ...calculateLevelData(state.stats.experience),
      },
      funds: state.funds + (state.fundsPerBlock * blockCount),
      blockNumber,
    };
  }
}
