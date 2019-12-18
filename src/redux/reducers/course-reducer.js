import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionTypes.EMPTY_COURSES:
      return [];
    default:
      return state;
  }
}
