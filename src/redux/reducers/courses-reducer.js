import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function coursesReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionTypes.COMPLETE_COURSE:
      return state.filter(
        (currentCourse) => currentCourse.ID != action.courseId
      )
    case actionTypes.ADD_COURSE:
      return [action.course, ...state]
    case actionTypes.DELETE_COURSE:
      return state.filter((currentCourse) => {
        return currentCourse.ID != action.courseId
      });
    default:
      return state;
  }
}
