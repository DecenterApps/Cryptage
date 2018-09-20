import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { CLEAR_STORE } from '../actions/actionTypes';
import appReducer from './appReducer';
import shopReducer from './shopReducer';
import gameplayReducer from './gameplayReducer';
import modalReducer from './modalReducer';
import leaderboardReducer from './leaderboardReducer';
import contractStateReducer from './contractStateReducer';
import tutorialsReducer from './tutorialsReducer';

const mainReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
  shop: shopReducer,
  gameplay: gameplayReducer,
  form: formReducer,
  modal: modalReducer,
  leaderboard: leaderboardReducer,
  contractState: contractStateReducer,
  tutorials: tutorialsReducer,
});

/*   Clears the store state    */
export default (state, action) => {
  if (action.type === CLEAR_STORE) {
    return mainReducer({
      app: {
        loadingApp: true,
      },
    }, action);
  }

  return mainReducer(state, action);
};
