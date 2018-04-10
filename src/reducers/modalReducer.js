import { TOGGLE_MODAL } from '../actions/actionTypes';

const INITIAL_STATE = {
  modalType: '',
  modalProps: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODAL: {
      const close = !payload.action;

      if (close) return { ...state, modalType: '' };

      return {
        modalType: payload.modalType,
        modalProps: payload.modalProps,
      };
    }

    default:
      return state;
  }
};
