import * as actionTypes from './action-types';

export function beginApiCall() {
  return {
    type: actionTypes.BEGIN_API_CALL,
  };
}

export function apiCallError(error) {
  return {
    type: actionTypes.API_CALL_ERROR,
    error,
  };
}

export function apiClearError() {
  return {
    type: actionTypes.API_CLEAR_ERROR,
  };
}
