import {
  DROP_LOCATION, CHANGE_GAMEPLAY_VIEW, SET_ACTIVE_LOCATION, DROP_ASSET, GP_LOCATION,
  LOCATION_DROP_SLOTS, USERS_CARDS_SUCCESS, REVEAL_SUCCESS, LOAD_STATE_FROM_STORAGE,
  UPDATE_GLOBAL_VALUES, LEVEL_UP_CARD, DROP_MINER, PROJECT_DROP_SLOTS, DROP_PROJECT,
  CHANGE_PROJECT_STATE, ADD_LOCATION_SLOTS, ADD_ASSET_SLOTS, ADD_EXPERIENCE, GP_LOCATION_MAIN,
  SWITCH_IN_GAMEPLAY_VIEW, GP_NO_LOCATIONS,
} from '../actions/actionTypes';
import { mergeDeep } from '../services/utils';

const INITIAL_STATE = {
  gameplayView: GP_NO_LOCATIONS,
  inGameplayView: GP_LOCATION_MAIN,
  cards: [],
  locations: LOCATION_DROP_SLOTS,
  projects: PROJECT_DROP_SLOTS,
  activeLocationIndex: 0,
  activeContainerIndex: 0,
  globalStats: {
    level: 1,
    experience: 0,
    earnedXp: 0,
    requiredXp: 0,
    funds: 1000000000000,
    development: 10000000000,
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
    case REVEAL_SUCCESS:
      return { ...state, cards: action.cards };

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
      return { ...state, locations: payload };

    case SWITCH_IN_GAMEPLAY_VIEW:
      return { ...state, inGameplayView: payload.viewType, activeContainerIndex: payload.containerIndex };

    default:
      return state;
  }
};
