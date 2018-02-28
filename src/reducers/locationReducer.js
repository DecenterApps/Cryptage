import { ADD_ACTIVE_LOC } from '../actions/actionTypes';

const INITIAL_STATE = {
  locations: [],
  activeLocationIndex: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case ADD_ACTIVE_LOC:
      return {
        ...state,
        locations: [...state.locations, action.card],
        activeLocationIndex: state.locations.length,
      };

    default:
      return state;
  }
};
