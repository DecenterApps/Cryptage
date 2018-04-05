import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { CLEAR_STORE } from '../actions/actionTypes';
import appReducer from './appReducer';
import shopReducer from './shopReducer';
import gameplayReducer from './gameplayReducer';

const mainReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
  shop: shopReducer,
  gameplay: gameplayReducer,
  form: formReducer,
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
