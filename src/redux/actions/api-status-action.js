import * as actionTypes from './action-types';

export function beginApiCall() {
  return {
    type: actionTypes.BEGIN_API_CALL,
  };
}

export function apiCallError() {
  return {
    type: actionTypes.API_CALL_ERROR,
  };
}
