import {
  DROP_LOCATION,
  ON_NEW_BLOCK,
  CHANGE_GAMEPLAY_VIEW,
  SET_ACTIVE_LOCATION,
  DROP_ASSET,
  GP_LOCATION,
  USERS_CARDS_SUCCESS,
  REVEAL_SUCCESS,
  LOAD_STATE_FROM_STORAGE,
  GP_LOCATION_MAIN,
  SWITCH_IN_GAMEPLAY_VIEW,
  REMOVE_CARD,
  SUBMIT_NICKNAME_SUCCESS,
  GP_NO_LOCATIONS,
  ADD_NEW_LEVEL_CARDS,
  REMOVE_NEW_FROM_CARD,
  UPDATE_BLOCK_NUMBER,
  GENERATE_NEW_GAMEPLAY,
  RESTART_PROJECT,
  GET_ACCOUNT_SUCCESS,
} from '../actions/actionTypes';
import { saveGameplayState } from '../services/utils';
import Gameplay from '../classes/Gameplay';

const switchState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DROP_LOCATION:
      return new Gameplay(state.blockNumber, {
        ...state,
        ...payload.newGameplay,
        activeLocationIndex: payload.index,
        inGameplayView: GP_LOCATION_MAIN,
        gameplayView: GP_LOCATION,
      });

    case DROP_ASSET:
    case LOAD_STATE_FROM_STORAGE:
    case GENERATE_NEW_GAMEPLAY:
    case RESTART_PROJECT:
      return new Gameplay(state.blockNumber, {
        ...state,
        ...payload,
      });

    case ON_NEW_BLOCK:
      return new Gameplay(payload.blockNumber, {
        ...state,
        ...payload,
      });

    case SET_ACTIVE_LOCATION:
      return new Gameplay(state.blockNumber, {
        ...state,
        activeLocationIndex: payload,
        gameplayView: GP_LOCATION,
        inGameplayView: GP_LOCATION_MAIN,
      });

    case CHANGE_GAMEPLAY_VIEW:
      return new Gameplay(state.blockNumber, {
        ...state,
        gameplayView: payload,
      });

    case USERS_CARDS_SUCCESS:
    case REMOVE_NEW_FROM_CARD:
      return new Gameplay(state.blockNumber, {
        ...state,
        cards: payload,
      });

    case REVEAL_SUCCESS:
      return new Gameplay(state.blockNumber, {
        ...state,
        cards: action.cards,
      });

    case SWITCH_IN_GAMEPLAY_VIEW:
      return new Gameplay(state.blockNumber, {
        ...state,
        inGameplayView: payload.viewType,
        activeContainerIndex: payload.containerIndex,
      });

    case REMOVE_CARD:
      return new Gameplay(state.blockNumber, {
        ...state,
        ...payload.newGameplay,
        gameplayView: payload.gameplayView,
      });

    case ADD_NEW_LEVEL_CARDS:
      return new Gameplay(state.blockNumber, {
        ...state,
        cards: payload,
      });

    case SUBMIT_NICKNAME_SUCCESS:
      return new Gameplay(state.blockNumber, {
        ...state,
        gameplayView: GP_NO_LOCATIONS,
        nickname: payload,
      });

    case UPDATE_BLOCK_NUMBER:
      return new Gameplay(payload, { ...state });

    case GET_ACCOUNT_SUCCESS:
      return new Gameplay(state.blockNumber, {
        ...state,
        account: payload,
      });

    default:
      return state;
  }
};


export default (state = new Gameplay(0), action) => {
  return saveGameplayState(switchState(state, action), action.type);
};
