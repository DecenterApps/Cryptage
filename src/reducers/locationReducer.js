import {
  ADD_ACTIVE_LOC, GP_LOCATION, CHANGE_GAMEPLAY_VIEW, SET_ACTIVE_LOCATION, DROP_ASSET,
  LOAD_STATE_FROM_STORAGE, LOCATION_DROP_SLOTS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  locations: LOCATION_DROP_SLOTS,
  activeLocationIndex: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ACTIVE_LOC:
      return {
        ...state,
        locations: action.locations,
        activeLocationIndex: action.activeLocationIndex,
      };

    case SET_ACTIVE_LOCATION:
      return { ...state, activeLocationIndex: payload };

    case CHANGE_GAMEPLAY_VIEW:
      return { ...state, activeLocationIndex: payload === GP_LOCATION ? state.activeLocationIndex : null };

    case DROP_ASSET: {
      return { ...state, locations: action.locations };
    }

    // case LOAD_STATE_FROM_STORAGE:
    //   return { ...payload };

    default:
      return state;
  }
};
