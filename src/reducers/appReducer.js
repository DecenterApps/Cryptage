import { CHANGE_GAMEPLAY_VIEW } from '../actions/actionTypes';

const INITIAL_STATE = {
  gameplayView: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_GAMEPLAY_VIEW:
      return { ...state, gameplayView: payload };

    default:
      return state;
  }
};
