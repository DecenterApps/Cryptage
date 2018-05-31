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
    this.allCards = [];
    this.playedCards = [];
    this.handCards = [];
    this.blockNumber = blockNumber;
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

  addPlayedCard(state, card) {
    const cardIndex = state.handCards.findIndex(handCard => handCard.id === card.id);
    state.playedCards.push(state.handCards.splice(cardIndex, 1)[0]);

    return state;
  }

  removePlayedCard(state, card) {
    const cardsToAddToHand = card.stackedCardIds
      .reduce((acc, stackedCardId) => {
        const cardIndex = state.playedCards.findIndex(playedCard => playedCard.id === stackedCardId);
        acc.push(state.playedCards.splice(cardIndex, 1)[0]);

        return acc;
      }, []);

    state.handCards = state.handCards.concat(cardsToAddToHand);

    return state;
  }

  getCardsOfType(type) {
    return this.playedCards.filter(card => card instanceof type);
  }

  updateBlockNumber(state, blockNumber) {
    const blockCount = blockNumber - state.blockNumber;

    if (blockCount < 1) return state;

    for (const card of this.playedCards) {
      state = card.block(state, blockCount);
    }

    return Object.assign(this, {
      ...state,
      stats: {
        ...state.stats,
        ...calculateLevelData(state.stats.experience),
      },
      funds: state.funds + (state.fundsPerBlock * blockCount),
      blockNumber,
    });
  }
}
