import * as actionTypes from './action-types';

export function beginApiCall() {
  return {
    type: actionTypes.BEGIN_API_CALL
  };
}
