import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import shopReducer from './shopReducer';
import locationReducer from './locationReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  shop: shopReducer,
  location: locationReducer,
});
