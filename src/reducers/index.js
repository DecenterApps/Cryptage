import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
});
