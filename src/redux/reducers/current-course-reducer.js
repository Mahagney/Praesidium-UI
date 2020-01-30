import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function currentCourseReducer(
  state = initialState.currentCourse,
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_COURSE_BY_ID_SUCCESS:
      return action.currentCourse;
    default:
      return state;
  }
}
