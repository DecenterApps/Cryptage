import {
  DROP_LOCATION,
  CHANGE_GAMEPLAY_VIEW,
  SET_ACTIVE_LOCATION,
  DROP_ASSET,
  GP_LOCATION,
  LOCATION_DROP_SLOTS,
  USERS_CARDS_SUCCESS,
  REVEAL_SUCCESS,
  LOAD_STATE_FROM_STORAGE,
  UPDATE_GLOBAL_VALUES,
  LEVEL_UP_CARD,
  DROP_MINER,
  PROJECT_DROP_SLOTS,
  DROP_PROJECT,
  CHANGE_PROJECT_STATE,
  ADD_LOCATION_SLOTS,
  ADD_ASSET_SLOTS,
  ADD_EXPERIENCE,
  GP_LOCATION_MAIN,
  SWITCH_IN_GAMEPLAY_VIEW,
  GP_NO_NICKNAME,
  PLAY_TURN,
  REMOVE_CARD,
  SUBMIT_NICKNAME_SUCCESS,
  GP_NO_LOCATIONS,
  RETURN_CARDS,
  UPDATE_FUNDS_PER_BLOCK,
  UPDATE_LOCATIONS,
  ADD_NEW_LEVEL_CARDS,
  CLEAR_TURNS,
  REMOVE_NEW_FROM_CARD,
  UPDATE_BLOCK_NUMBER,
  CHANGE_LOCATIONS_STATE,
  UPDATE_PROJECT_EXECUTION_TIME_PERCENT,
  INCREMENT_TURN,
  REMOVE_ASSET_SLOTS,
} from '../actions/actionTypes';
import { mergeDeep } from '../services/utils';
import config from '../constants/config.json';
import levels from '../constants/levels.json';

const INITIAL_STATE = {
  nickname: '',
  blockNumber: 0,
  lastSavedStateBlock: 0,
  fundsPerBlock: 0,
  gameplayView: GP_NO_NICKNAME,
  inGameplayView: GP_LOCATION_MAIN,
  allCards: [],
  cards: [],
  newCardTypes: [],
  locations: LOCATION_DROP_SLOTS,
  projects: PROJECT_DROP_SLOTS,
  projectExecutionTimePercent: 100,
  activeLocationIndex: 0,
  activeContainerIndex: 0,
  playedTurns: [],
  globalStats: {
    level: config.globalStats.level,
    experience: config.globalStats.experience,
    earnedXp: 0,
    requiredXp: levels[1].change,
    funds: config.globalStats.funds,
    development: config.globalStats.development,
  },
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case DROP_LOCATION:
      return {
        ...state,
        locations: action.locations,
        cards: action.cards,
        activeLocationIndex: action.activeLocationIndex,
        globalStats: action.globalStats,
        inGameplayView: GP_LOCATION_MAIN,
        gameplayView: GP_LOCATION,
      };

    case SET_ACTIVE_LOCATION:
      return {
        ...state,
        activeLocationIndex: payload,
        gameplayView: GP_LOCATION,
        inGameplayView: GP_LOCATION_MAIN,
      };

    case CHANGE_GAMEPLAY_VIEW:
      return { ...state, gameplayView: payload };

    case DROP_MINER:
    case DROP_ASSET:
      return {
        ...state,
        locations: action.locations,
        cards: action.cards,
        globalStats: action.globalStats,
        fundsPerBlock: action.fundsPerBlock,
      };

    case DROP_PROJECT:
      return {
        ...state,
        projects: action.projects,
        cards: action.cards,
        globalStats: action.globalStats,
      };

    case CHANGE_PROJECT_STATE:
      return {
        ...state,
        projects: action.projects,
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        globalStats: {
          ...state.globalStats,
          ...action.levelData,
          experience: action.experience,
        },
      };

    case USERS_CARDS_SUCCESS:
      return {
        ...state,
        allCards: action.allCards || state.allCards,
        cards: action.cards,
      };

    case REVEAL_SUCCESS:
      return {
        ...state,
        allCards: action.allCards || state.allCards,
        cards: action.cards,
        newCardTypes: [...state.newCardTypes, ...action.newCardTypes],
      };

    case REMOVE_NEW_FROM_CARD:
      return { ...state, newCardTypes: payload };

    case LOAD_STATE_FROM_STORAGE:
      return { ...mergeDeep(state, payload) };

    case UPDATE_GLOBAL_VALUES:
      return { ...state, globalStats: payload };

    case LEVEL_UP_CARD:
      return {
        ...state,
        ...payload,
      };

    case ADD_LOCATION_SLOTS:
    case ADD_ASSET_SLOTS:
    case REMOVE_ASSET_SLOTS:
    case CHANGE_LOCATIONS_STATE:
      return { ...state, locations: payload };

    case SWITCH_IN_GAMEPLAY_VIEW:
      return {
        ...state,
        inGameplayView: payload.viewType,
        activeContainerIndex: payload.containerIndex,
      };

    case PLAY_TURN:
      return {
        ...state,
        playedTurns: [
          ...state.playedTurns,
          action.turn,
        ],
      };

    case INCREMENT_TURN:
      return {
        ...state,
        playedTurns: action.playedTurns,
      };

    case CLEAR_TURNS:
      return {
        ...state,
        playedTurns: [],
      };

    case REMOVE_CARD:
      return {
        ...state,
        locations: action.locations,
        cards: action.cards,
        globalStats: action.globalStats,
        gameplayView: action.gameplayView,
        fundsPerBlock: action.fundsPerBlock,
        projectExecutionTimePercent: action.projectExecutionTimePercent,
      };

    case RETURN_CARDS:
      return { ...state, cards: [...state.cards, ...action.cards] };

    case ADD_NEW_LEVEL_CARDS:
      return {
        ...state,
        cards: payload.cards,
        allCards: payload.allCards,
        newCardTypes: [...state.newCardTypes, ...payload.newCardTypes],
      };

    case SUBMIT_NICKNAME_SUCCESS:
      return { ...state, nickname: payload, gameplayView: GP_NO_LOCATIONS };

    case UPDATE_FUNDS_PER_BLOCK:
      return { ...state, fundsPerBlock: payload };

    case UPDATE_LOCATIONS:
      return { ...state, locations: payload };

    case UPDATE_BLOCK_NUMBER:
      return { ...state, blockNumber: payload };

    case UPDATE_PROJECT_EXECUTION_TIME_PERCENT:
      return { ...state, projectExecutionTimePercent: payload };

    default:
      return state;
  }
};
