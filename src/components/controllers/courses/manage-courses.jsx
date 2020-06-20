//#region 'NPM DEP'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//#endregion

//#region 'LOCAL DEP'
import * as courseActions from '../../../redux/actions/course-action'
import CoursesCards from '../../views/courses/courses-cards'
import NoCourses from '../../views/courses/no-courses'
import Spinner from '../../common/spinner'
import withAdmin from '../../hoc/with-Admin'
//#endregion

function ManageCourses({ history, courses, loggedUser, loadCourses, isAdmin }) {
  useEffect(() => {
    if (courses === null) {
      loadCourses(loggedUser).catch(() => {})
    }
  }, [])
  function handleCardClick(courseId) {
    history.push('/courses/' + courseId)
  }

  const component = (
    <CoursesCards
      courses={courses}
      handleCardClick={handleCardClick}
      history={history}
      showAddNewCourseButton={isAdmin}
    />
  )

  if (courses !== null) {
    if (courses.length) {
      return component
    } else {
      return <NoCourses />
    }
  } else {
    return <Spinner />
  }
}

ManageCourses.propTypes = {
  history: PropTypes.object.isRequired,
  courses: PropTypes.array,
  loggedUser: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    courses: state.courses,
  }
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
}

export default connect(mapStateToProps, mapDispatchToProps)(withAdmin(ManageCourses))
