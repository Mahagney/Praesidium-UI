//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import Course from '../../views/course';
import Spinner from '../../common/spinner';
import PdfViewer from '../../views/pdf';
import VideoPlayer from '../../views/video';
import Quiz from '../quiz/manage-quiz';
import * as courseActions from '../../../redux/actions/course-action';
import * as currentCourseAction from '../../../redux/actions/current-course-action';
//#endregion
function ManageCourse({
  match,
  history,
  loadCourses,
  loadCourseById,
  loggedUser,
  courses,
  course,
  currentCourse
}) {
  const [pdfNumPages, setPdfNumPages] = useState(null);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    if (!courses.length) {
      loadCourses(loggedUser).catch((error) => {});
    }
    loadCourseById(match.params.courseId);
  }, []);

  function handleDocumentLoadSuccess({ numPages }) {
    setPdfNumPages(numPages);
  }

  function handlePrevPage() {
    setPdfPageNumber((prevNumPages) => prevNumPages - 1);
  }

  function handleNextPage() {
    setPdfPageNumber((prevNumPages) => prevNumPages + 1);
  }

  function handleTabChange(value) {
    setTabValue(value);
  }
  let section = null;
  if (tabValue === 0) {
    section = <VideoPlayer videoUrl={currentCourse.VIDEO_URL} />;
  } else if (tabValue === 1) {
    section = (
      <PdfViewer
        onDocumentLoadSuccess={handleDocumentLoadSuccess}
        goToPrevPage={handlePrevPage}
        goToNextPage={handleNextPage}
        pageNumber={pdfPageNumber}
        numPages={pdfNumPages}
      />
    );
  } else {
    section = <Quiz />;
  }

  return courses.length ? (
    <Course course={course} section={section} onTabChange={handleTabChange} />
  ) : (
    <Spinner />
  );
}

ManageCourse.propTypes = {
  history: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadCourseById: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  currentCourse: PropTypes.object.isRequired
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
    currentCourse: state.currentCourse,
    courses: state.courses,
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadCourseById: currentCourseAction.loadCourseById
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
