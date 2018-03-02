import {
  CHANGE_GAMEPLAY_VIEW, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR, REVEAL_SUCCESS, ADD_ACTIVE_LOC,
  DROP_ASSET, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_ERROR, SET_ACTIVE_LOCATION, GP_LOCATION, LOAD_STATE_FROM_STORAGE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  account: '',
  accountBalance: 0,
  accountError: '',

  gameplayView: '',
  cardsFetching: true,
  cards: [],
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_GAMEPLAY_VIEW:
      return { ...state, gameplayView: payload };

    case USERS_CARDS_FETCH:
      return {
        ...state,
        cardsFetching: true,
      };
    case USERS_CARDS_ERROR:
      return {
        ...state,
        cardsFetching: false,
        cardsFetchingError: action.error,
      };
    case USERS_CARDS_SUCCESS:
      return {
        ...state,
        cardsFetching: false,
        cards: action.cards,
      };

    case REVEAL_SUCCESS:
      return { ...state, cards: action.cards };

    // case ADD_ACTIVE_LOC:
    //   return { ...state, cards: action.cards };

    // case DROP_ASSET:
    //   return { ...state, cards: action.cards };

    case GET_ACCOUNT_SUCCESS:
      return {
        ...state, account: action.account, accountBalance: action.balance, accountError: '',
      };

    case GET_ACCOUNT_ERROR:
      return {
        ...state, account: '', accountBalance: '', accountError: action.error,
      };

    // case SET_ACTIVE_LOCATION:
    // case LOAD_STATE_FROM_STORAGE:
    //   return { ...state, gameplayView: GP_LOCATION };

    default:
      return state;
  }
};
