import * as actionTypes from './action-types';
import * as userApi from '../../api/user-api';
import { beginApiCall } from './api-status-action';

function logInSuccess(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user
  };
}

export function logIn(user) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .logIn(user)
      .then((loggedUser) => {
        dispatch(logInSuccess(loggedUser));
        return loggedUser;
      })
      .catch((error) => {
        throw error;
      });
  };
}
