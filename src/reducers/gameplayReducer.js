import {
  DROP_LOCATION,
  ON_NEW_BLOCK,
  CHANGE_GAMEPLAY_VIEW,
  SET_ACTIVE_LOCATION,
  DROP_ASSET,
  GP_LOCATION,
  LOCATION_DROP_SLOTS,
  USERS_CARDS_SUCCESS,
  REVEAL_SUCCESS,
  LOAD_STATE_FROM_STORAGE,
  UPDATE_GLOBAL_VALUES,
  LEVEL_UP_CARD,
  PROJECT_DROP_SLOTS,
  CHANGE_PROJECT_STATE,
  ADD_EXPERIENCE,
  GP_LOCATION_MAIN,
  SWITCH_IN_GAMEPLAY_VIEW,
  GP_NO_NICKNAME,
  PLAY_TURN,
  REMOVE_CARD,
  SUBMIT_NICKNAME_SUCCESS,
  GP_NO_LOCATIONS,
  RETURN_CARDS,
  UPDATE_FUNDS_PER_BLOCK,
  UPDATE_LOCATIONS,
  ADD_NEW_LEVEL_CARDS,
  CLEAR_TURNS,
  REMOVE_NEW_FROM_CARD,
  UPDATE_BLOCK_NUMBER,
  CHANGE_LOCATIONS_STATE,
  UPDATE_PROJECT_EXECUTION_TIME_PERCENT,
  INCREMENT_TURN,
  REMOVE_ASSET_SLOTS,
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
    //
    // case CHANGE_GAMEPLAY_VIEW:
    //   return { ...state, gameplayView: payload };
    //
    //
    // case CHANGE_PROJECT_STATE:
    //   return {
    //     ...state,
    //     projects: action.projects,
    //   };
    // case ADD_EXPERIENCE:
    //   return {
    //     ...state,
    //     globalStats: {
    //       ...state.globalStats,
    //       ...action.levelData,
    //       experience: action.experience,
    //     },
    //   };
    //
    case USERS_CARDS_SUCCESS:
      return new Gameplay(state.blockNumber, {
        ...state,
        cards: payload,
      });
    //
    case REVEAL_SUCCESS:
      return new Gameplay(state.blockNumber, {
        ...state,
        cards: action.cards,
      });
    //
    // case REMOVE_NEW_FROM_CARD:
    //   return { ...state, newCardTypes: payload };

    // case UPDATE_GLOBAL_VALUES:
    //   return { ...state, globalStats: payload };
    //
    // case LEVEL_UP_CARD:
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    //
    // case REMOVE_ASSET_SLOTS:
    // case CHANGE_LOCATIONS_STATE:
    //   return { ...state, locations: payload };
    //
    case SWITCH_IN_GAMEPLAY_VIEW:
      return new Gameplay(state.blockNumber, {
        ...state,
        inGameplayView: payload.viewType,
        activeContainerIndex: payload.containerIndex,
      });
    //
    // case PLAY_TURN:
    //   return {
    //     ...state,
    //     playedTurns: [
    //       ...state.playedTurns,
    //       action.turn,
    //     ],
    //   };
    //
    // case INCREMENT_TURN:
    //   return {
    //     ...state,
    //     playedTurns: action.playedTurns,
    //   };
    //
    // case CLEAR_TURNS:
    //   return {
    //     ...state,
    //     playedTurns: [],
    //   };
    //
    case REMOVE_CARD:
      return new Gameplay(state.blockNumber, {
        ...state,
        ...payload.newGameplay,
        gameplayView: payload.gameplayView,
      });
    //
    // case RETURN_CARDS:
    //   return { ...state, cards: [...state.cards, ...action.cards] };
    //
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

    //
    // case UPDATE_FUNDS_PER_BLOCK:
    //   return { ...state, fundsPerBlock: payload };
    //
    // case UPDATE_LOCATIONS:
    //   return { ...state, locations: payload };
    //
    //
    // case UPDATE_PROJECT_EXECUTION_TIME_PERCENT:
    //   return { ...state, projectExecutionTimePercent: payload };

    default:
      return state;
  }
};


export default (state = new Gameplay(0), action) => {
  return saveGameplayState(switchState(state, action), action.type);
};
