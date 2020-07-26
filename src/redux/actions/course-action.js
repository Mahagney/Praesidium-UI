import * as actionTypes from './action-types'
import * as courseApi from '../../api/course-api'
import * as userApi from '../../api/user-api'
import { beginApiCall, apiCallError } from './api-status-action'
import { logOutUser } from './user-action'

import { role } from './../../constants'

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

function deleteCourseSuccess(courseId) {
  return {
    type: actionTypes.DELETE_COURSE,
    courseId: courseId
  };
}

function addCourseSuccess(course) {
  return {
    type: actionTypes.ADD_COURSE,
    course: course,
  }
}

export function completeCourse(courseId, loggedUser, score) {
  return async function (dispatch) {
    dispatch(beginApiCall())
    if (loggedUser.role !== role.ADMIN) {
      const response = await courseApi.sendUserCompletion(
        courseId,
        loggedUser.id,
        score
      )
      if (response === 'done') {
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

export function deleteCourse(courseId) {
  return async function (dispatch) {
    dispatch(beginApiCall())
    try {
      const result = await courseApi.deleteCourse(courseId)
      if (result.status == 200) dispatch(deleteCourseSuccess(courseId))
    } catch (error) {
      dispatch(apiCallError())
      throw error
    }
  }
}

export function addCourse(course) {
  return async function (dispatch) {
    dispatch(beginApiCall())
    try {
      const result = await courseApi.addCourse(course)
      if (result.status == 200) dispatch(addCourseSuccess(result.data))
    } catch (error) {
      dispatch(apiCallError())
      throw error
    }
  }
}
