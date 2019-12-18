//#region 'NPM DEP'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import * as courseActions from '../../../redux/actions/course-action';
import CoursesCards from '../../views/courses/courses-cards';
//#endregion

function ManageCourses({ history, courses, loggedUser, loadCourses }) {
  useEffect(() => {
    if (!courses.length) {
      loadCourses(loggedUser).catch((error) => {
        console.log(error.customMessage);
      });
    }
  }, []);

  function handleCardClick() {
    console.log('click pe card');
  }
  return <CoursesCards courses={courses} handleCardClick={handleCardClick} />;
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
