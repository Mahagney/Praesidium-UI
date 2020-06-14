import * as actionTypes from './action-types'
import * as courseApi from '../../api/course-api'
import * as userApi from '../../api/user-api'
import {
  beginApiCall,
  apiCallError
} from './api-status-action'
import {
  logOutUser
} from './user-action'

import {
  role
} from './../../constants'

function completeCourseSuccess(courseId) {
  return {
    type: actionTypes.COMPLETE_COURSE,
    courseId
  };
}

function loadCoursesSuccess(courses) {
  return {
    type: actionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function completeCourse(courseId, loggedUser, score) {
  return async function (dispatch) {
    dispatch(beginApiCall())
    if (loggedUser.role !== role.ADMIN) {
      const response = courseApi.sendUserCompletion(courseId, loggedUser.id, score)
      if (response.status === 200 && response.data === 'done') {
        dispatch(completeCourseSuccess(courseId))
      }
    }
  };
}

export function loadCourses(loggedUser) {
  return async function (dispatch) {
    dispatch(beginApiCall())
    try {
      let courses
      if (loggedUser.role === role.ADMIN) {
        courses = await courseApi.getCoursesForAdmin()
      } else {
        courses = await userApi.APIgetCoursesForUser(loggedUser)
      }
      dispatch(loadCoursesSuccess(courses))
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch(logOutUser())
      }
      dispatch(apiCallError())
      throw error
    }
    return 'done'
  }
}
