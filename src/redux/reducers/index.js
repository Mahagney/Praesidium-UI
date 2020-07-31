import { combineReducers } from 'redux';
import user from './user-reducer';
import apiCallsInProgress from './api-status-reducer';
import courses from './courses-reducer';
import currentCourse from './current-course-reducer';

const appReducer = combineReducers({
  user,
  courses,
  apiCallsInProgress,
  currentCourse,
});

export default appReducer;
