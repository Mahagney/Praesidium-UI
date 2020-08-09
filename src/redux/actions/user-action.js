//#region 'LOCAL DEP'
import * as actionTypes from './action-types';
import { beginApiCall } from './api-action';
import * as userApi from '../../api/user-api';
import apiErrorHandler from '../../api/api-error-handler';
//#region

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
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const loggedUser = await userApi.APIlogIn(user);
      dispatch(logInSuccess(loggedUser));
      return loggedUser;
    } catch (error) {
      apiErrorHandler(error);
      throw error;
    }
  };
}
