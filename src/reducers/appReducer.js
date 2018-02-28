import {
  CHANGE_GAMEPLAY_VIEW,
  USERS_CARDS_FETCH,
  USERS_CARDS_SUCCESS,
  USERS_CARDS_ERROR,
  REVEAL_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  gameplayView: '',
  cardsFetching: true,
  cards: [],
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

    default:
      return state;
  }
};
