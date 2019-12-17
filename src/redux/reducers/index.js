import { combineReducers } from 'redux';
import user from './user-reducer';
import apiCallsInProgress from './api-status-reducer';
import courses from './course-reducer';

const rootReducer = combineReducers({
  user,
  courses,
  apiCallsInProgress
});

export default rootReducer;
