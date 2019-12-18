import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.user;
    case actionTypes.SET_CURRENT_USER:
      return action.user;
    case actionTypes.LOG_OUT_USER:
      return {};
    default:
      return state;
  }
}
