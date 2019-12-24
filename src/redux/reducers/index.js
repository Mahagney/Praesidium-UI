import { combineReducers } from 'redux';
import user from './user-reducer';
import apiCallsInProgress from './api-status-reducer';
import courses from './courses-reducer';

const appReducer = combineReducers({
  user,
  courses,
  apiCallsInProgress
});

export default appReducer;
