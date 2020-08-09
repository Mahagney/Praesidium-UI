import initialState from './initial-state';
import * as actionTypes from '../actions/action-types';

export default function apiReducer(state = initialState.api, action) {
  switch (action.type) {
    case actionTypes.API_CALL_ERROR:
      return {
        apiError: action.error,
      };
    case actionTypes.API_CLEAR_ERROR:
      return {
        apiError: '',
      };
    default:
      return state;
  }
}
