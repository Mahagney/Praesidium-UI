import * as actionTypes from './action-types';
import * as courseApi from '../../api/course-api';
import { beginApiCall } from './api-status-action';

function loadCoursesSuccess(courses) {
  return {
    type: actionTypes.LOAD_COURSES,
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
        throw error;
      });
  };
}
