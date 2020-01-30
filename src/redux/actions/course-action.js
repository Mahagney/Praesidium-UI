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

export function loadCourses(loggedUser) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses(loggedUser)
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
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
