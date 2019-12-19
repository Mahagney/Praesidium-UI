import * as actionTypes from './action-types';
import * as courseApi from '../../api/course-api';
import { beginApiCall, apiCallError } from './api-status-action';
import { logOutUser } from './user-action';

function loadCoursesSuccess(courses) {
  return {
    type: actionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function emptyCourses() {
  return {
    type: actionTypes.EMPTY_COURSES
  };
}

export function loadCourses(loggedUser) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses(loggedUser)
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        debugger;
        if (error.response && error.response.status === 403) {
          dispatch(emptyCourses());
          dispatch(logOutUser());
          localStorage.removeItem('token');
        }
        dispatch(apiCallError());
        throw error;
      });
  };
}
