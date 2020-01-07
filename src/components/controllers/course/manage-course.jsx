//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import { loadCourses } from '../../../redux/actions/course-action';
import Course from '../../views/course';
import Spinner from '../../common/spinner';
//#endregion
function ManageCourse({ history, loadCourses, loggedUser, courses, course }) {
  const [pdfNumPages, setPdfNumPages] = useState(null);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);

  useEffect(() => {
    if (!courses.length) {
      loadCourses(loggedUser).catch((error) => {
        console.log(error.customMessage);
      });
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setPdfNumPages(numPages);
  }

  function goToPrevPage() {
    setPdfPageNumber((prevNumPages) => prevNumPages - 1);
  }

  function goToNextPage() {
    setPdfPageNumber((prevNumPages) => prevNumPages + 1);
  }

  return courses.length ? (
    <Course
      course={course}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      pdfNumPages={pdfNumPages}
      pdfPageNumber={pdfPageNumber}
    />
  ) : (
    <Spinner />
  );
}

ManageCourse.propTypes = {
  history: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired
};

function getCourseById(courses, courseId) {
  return courses.find((c) => c.ID === courseId) || null;
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  const courseId = ownProps.match.params.courseId;
  const course =
    courseId && state.courses.length > 0
      ? getCourseById(state.courses, courseId)
      : {};
  return {
    course,
    courses: state.courses,
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
