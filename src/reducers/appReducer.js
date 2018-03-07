import {
  USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR,
  GET_ACCOUNT_SUCCESS, GET_ACCOUNT_ERROR, LOADING_ENDED, UPDATE_BLOCK_NUMBER,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loadingApp: true,

  account: '',
  accountBalance: 0,
  accountError: '',

  blockNumber: 0,

  cardsFetching: true,
  cardsFetchingError: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_ENDED:
      return { ...state, loadingApp: false };

    case UPDATE_BLOCK_NUMBER:
      return { ...state, blockNumber: payload };

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
      return { ...state, cardsFetching: false };

    case GET_ACCOUNT_SUCCESS:
      return {
        ...state, account: action.account, accountBalance: action.balance, accountError: '',
      };

    case GET_ACCOUNT_ERROR:
      return {
        ...state, account: '', accountBalance: '', accountError: action.error,
      };

    default:
      return state;
  }
};
