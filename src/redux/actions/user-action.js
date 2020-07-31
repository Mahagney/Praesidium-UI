import * as actionTypes from './action-types';
import * as userApi from '../../api/user-api';
import { beginApiCall, apiCallError } from './api-status-action';

function logInSuccess(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
}

export function setCurrentUser(user) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    user,
  };
}

export function logOutUser() {
  return {
    type: actionTypes.LOG_OUT_USER,
  };
}

export function logIn(user) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .logIn(user)
      .then((loggedUser) => {
        dispatch(logInSuccess(loggedUser));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
