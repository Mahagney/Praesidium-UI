//#region 'NPM DEP'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import * as courseActions from '../../../redux/actions/course-action';
import CoursesCards from '../../views/courses/courses-cards';
import Spinner from '../../common/spinner';
//#endregion

function ManageCourses({ history, courses, loggedUser, loadCourses }) {
  useEffect(() => {
    if (!courses.length) {
      loadCourses(loggedUser).catch((error) => {});
    }
  }, []);

  function handleCardClick(courseId) {
    history.push('/courses/' + courseId);
  }
  return courses.length ? (
    <CoursesCards courses={courses} handleCardClick={handleCardClick} />
  ) : (
    <Spinner />
  );
}

ManageCourses.propTypes = {
  history: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loggedUser: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    courses: state.courses
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourses);
