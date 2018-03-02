import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import shopReducer from './shopReducer';
import gameplayReducer from './gameplayReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  shop: shopReducer,
  gameplay: gameplayReducer,
});
