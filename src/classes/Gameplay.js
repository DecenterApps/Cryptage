import config from '../constants/config.json';
import cardConfig from '../constants/cards.json';
import levels from '../constants/levels.json';
import LocationCardSlot from './slotTypes/LocationCardSlot';
import ProjectCardSlot from './slotTypes/ProjectCardSlot';
import { createMatcher, isActiveCard } from './matchers';
import './mechanics';
import './cardTypes';
import './slotTypes';
import { calculateLevelData } from '../services/gameMechanicsService';
import { GP_LOCATION_MAIN, GP_NO_NICKNAME } from '../actions/actionTypes';

const subscriptions = Symbol('subscriptions');

export default class Gameplay {
  constructor(blockNumber) {
    this.nickname = '';

    this.gameplayView = GP_NO_NICKNAME;
    this.inGameplayView = GP_LOCATION_MAIN;
    this.activeLocationIndex = 0;
    this.activeContainerIndex = 0;

    this.cards = [];
    this.blockNumber = blockNumber;
    this.projectExecutionTimePercent = 100;
    this.stats = {
      level: config.globalStats.level,
      experience: config.globalStats.experience,
      requiredXp: levels[1].change,
      funds: config.globalStats.funds,
      development: config.globalStats.development,
      fundsPerBlock: 0,
    };
    this.locationSlots = new Array(cardConfig.locationSlots);
    this.projectSlots = new Array(cardConfig.projectSlots);

    this[subscriptions] = new Map();

    for (let i = 0; i < this.locationSlots.length; i += 1) {
      this.locationSlots[i] = new LocationCardSlot();
    }

    for (let i = 0; i < this.locationSlots.length; i += 1) {
      this.projectSlots[i] = new ProjectCardSlot();
    }
  }

  subscribe(event, matcher, callback) {
    if (typeof callback === 'undefined') {
      callback = matcher;
      matcher = isActiveCard;
    }

    if (!this[subscriptions].has(event)) {
      this[subscriptions].set(event, new Set());
    }

    const subscription = { matcher, callback };

    this[subscriptions].get(event).add(subscription);

    return () => this[subscriptions].get(event).delete(subscription);
  }

  publish(state, event, target) {
    if (!this[subscriptions].has(event)) {
      return state;
    }
    let newState = state;
    for (const { matcher, callback } of this[subscriptions].get(event)) {
      if (matcher(target)) {
        newState = callback(newState, target);
      }
    }
    return newState;
  }

  getCardsOfType(cardType) {
    return this.getCards(createMatcher({ cardType }));
  }

  getCards(matcher = isActiveCard) {
    return this.cards.filter(createMatcher(matcher));
  }

  updateBlockNumber(state, blockNumber) {
    const blockCount = blockNumber - state.blockNumber;

    if (blockCount < 1) return state;

    for (const card of this.cards) {
      if (card.active) {
        state = card.block(state, blockNumber, blockCount);
      }
    }

    return {
      ...state,
      stats: {
        ...state.stats,
        ...calculateLevelData(state.stats.experience),
        funds: state.stats.funds + (state.stats.fundsPerBlock * blockCount),
      },
      blockNumber,
    };
  }
}
