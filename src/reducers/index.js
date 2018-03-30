import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import shopReducer from './shopReducer';
import gameplayReducer from './gameplayReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  shop: shopReducer,
  gameplay: gameplayReducer,
  form: formReducer,
});
