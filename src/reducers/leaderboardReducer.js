import {
  FETCH_LEADERBOARD_DATA,
  FETCH_LEADERBOARD_DATA_SUCCESS,
  FETCH_LEADERBOARD_DATA_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  leaderboardData: null,
  fetching: true,
  fetchingError: '',
  fetchingSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_LEADERBOARD_DATA:
      return { ...state, fetching: true };

    case FETCH_LEADERBOARD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchingSuccess: true,
        fetchingError: '',
        leaderboardData: payload,
      };

    case FETCH_LEADERBOARD_DATA_ERROR:
      return {
        ...state,
        fetching: false,
        fetchingSuccess: false,
        fetchingError: payload,
      };

    default:
      return state;
  }
};
