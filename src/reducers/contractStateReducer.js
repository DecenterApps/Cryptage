import {
  SAVE_STATE_REQUEST,
  SAVE_STATE_SUCCESS,
  SAVE_STATE_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isSaving: false,
  saveError: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_STATE_REQUEST:
    case SAVE_STATE_SUCCESS:
    case SAVE_STATE_ERROR:
      return { ...state, ...payload };

    default:
      return state;
  }
};
