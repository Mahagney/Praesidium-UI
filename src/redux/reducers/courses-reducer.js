import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function coursesReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
