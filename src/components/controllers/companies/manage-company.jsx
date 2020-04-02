//#region 'NPM DEP'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'

//#endregion

function ManageCompany({ history, courses, loggedUser, loadCourses }) {
  useEffect(() => {
    if (!courses.length) {
      //loadCourses(loggedUser).catch(() => { });
    }
  }, []);

  function handleCardClick(courseId) {
    history.push('/courses/' + courseId);
  }
  return <div />
  // return courses.length ? (
  //   <CoursesCards
  //     courses={courses}
  //     handleCardClick={handleCardClick}
  //     history={history}
  //   />
  // ) : (
  //     <Spinner />
  //   );
}

ManageCompany.propTypes = {
  // history: PropTypes.object.isRequired,
  // courses: PropTypes.array.isRequired,
  // loggedUser: PropTypes.object.isRequired,
  // loadCourses: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    courses: state.courses
  };
}

const mapDispatchToProps = {
  //loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompany);
