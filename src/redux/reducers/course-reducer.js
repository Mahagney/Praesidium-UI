import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES:
      return action.courses;
    default:
      return state;
  }
}
