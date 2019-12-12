import { combineReducers } from 'redux';
import user from './user-reducer';
import apiCallsInProgress from './api-status-reducer';

const rootReducer = combineReducers({
  user,
  apiCallsInProgress
});

export default rootReducer;
