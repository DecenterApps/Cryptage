import {
  DROP_LOCATION, CHANGE_GAMEPLAY_VIEW, SET_ACTIVE_LOCATION, DROP_ASSET, GP_LOCATION,
  LOCATION_DROP_SLOTS, USERS_CARDS_SUCCESS, REVEAL_SUCCESS, LOAD_STATE_FROM_STORAGE,
  UPDATE_GLOBAL_VALUES, LEVEL_UP_CARD,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  gameplayView: '',
  cards: [],
  locations: LOCATION_DROP_SLOTS,
  activeLocationIndex: 0,
  globalStats: {
    level: 10,
    funds: 0,
    development: 0,
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
      return { ...state, activeLocationIndex: payload, gameplayView: GP_LOCATION };

    case CHANGE_GAMEPLAY_VIEW:
      return { ...state, gameplayView: payload };

    case DROP_ASSET: {
      return { ...state, locations: action.locations, cards: action.cards, globalStats: action.globalStats };
    }

    case USERS_CARDS_SUCCESS:
    case REVEAL_SUCCESS:
      return { ...state, cards: action.cards };

    case LOAD_STATE_FROM_STORAGE:
      return { ...payload };

    case UPDATE_GLOBAL_VALUES:
      return { ...state, globalStats: payload };

    case LEVEL_UP_CARD:
      return { ...state, locations: payload.locations, globalStats: payload.globalStats };

    default:
      return state;
  }
};
