import * as actionTypes from '../actions/action-types';
import initialState from './initial-state';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  }
  if (actionTypeEndsInSuccess(action.type) || action.type === actionTypes.API_CALL_ERROR) {
    return state - 1;
  }

  return state;
}
