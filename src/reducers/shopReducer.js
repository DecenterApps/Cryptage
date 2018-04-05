import {
  BOOSTERS_REQUEST,
  BOOSTERS_SUCCESS,
  BOOSTERS_ERROR,
  BUY_BOOSTER_REQUEST,
  BUY_BOOSTER_SUCCESS,
  BUY_BOOSTER_ERROR,
  REVEAL_SUCCESS,
  REVEAL_REQUEST,
  REVEAL_ERROR,
  CHANGE_GAMEPLAY_VIEW,
  SWITCH_IN_GAMEPLAY_VIEW,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  isBuying: false,
  isRevealing: false,
  boosters: [],
  revealedCards: [],
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOSTERS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case BOOSTERS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        boosters: action.boosters,
      };
    case BOOSTERS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.error,
      };
    case BUY_BOOSTER_REQUEST:
      return {
        ...state,
        isBuying: action.isBuying,
      };
    case BUY_BOOSTER_SUCCESS:
      return {
        ...state,
        isBuying: action.isBuying,
        boosters: [
          ...state.boosters,
          action.booster,
        ],
      };
    case BUY_BOOSTER_ERROR:
      return {
        ...state,
        isBuying: action.isBuying,
      };
    case REVEAL_REQUEST:
      return {
        ...state,
        boosters: action.boosters,
        isRevealing: action.isRevealing,
      };
    case REVEAL_SUCCESS:
      return {
        ...state,
        boosters: action.boosters,
        revealedCards: action.revealedCards,
        isRevealing: action.isRevealing,
      };
    case REVEAL_ERROR:
      return {
        ...state,
        error: action.error,
        isRevealing: action.isRevealing,
      };
    case CHANGE_GAMEPLAY_VIEW:
    case SWITCH_IN_GAMEPLAY_VIEW:
      return {
        ...state,
        revealedCards: [],
      };
    default:
      return state;
  }
};
