import * as actionTypes from '../actions/action-types';
import { beginApiCall, apiCallError } from './api-status-action';
import * as courseApi from '../../api/course-api';
import { logOutUser } from './user-action';

function loadCourseByIdSuccess(currentCourse) {
  return {
    type: actionTypes.LOAD_COURSE_BY_ID_SUCCESS,
    currentCourse: currentCourse
  };
}

export function loadCourseById(courseId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourseById(courseId)
      .then((currentCourse) => {
        dispatch(loadCourseByIdSuccess(currentCourse));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          dispatch(logOutUser());
          localStorage.removeItem('token');
        }
        dispatch(apiCallError());
        throw error;
      });
  };
}
