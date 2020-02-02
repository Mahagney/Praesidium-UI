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
import { loadCourses } from '../../../redux/actions/course-action';
import { getQuizByCourseId, getCourseById } from '../../../api/course-api';
//#endregion
function ManageCourse({
  match,
  loadCourses,
  loggedUser,
  courses,
  currCourseName
}) {
  const [currentCourse, setCurrentCourse] = useState({});
  const [pdfNumPages, setPdfNumPages] = useState(1);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    if (!courses.length) {
      loadCourses(loggedUser).catch(() => {});
    }
    getCourseById(match.params.courseId).then((course) => {
      setCurrentCourse(course);
      setTabValue(course.VIDEO_URL ? 0 : 1);
    });
    getQuizByCourseId(match.params.courseId).then((quiz) => setQuiz(quiz));
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
    section = currentCourse.VIDEO_URL ? (
      <VideoPlayer videoUrl={currentCourse.VIDEO_URL} />
    ) : (
      <Spinner />
    );
  } else if (tabValue === 1) {
    section = currentCourse.PDF_URL ? (
      <PdfViewer
        onDocumentLoadSuccess={handleDocumentLoadSuccess}
        goToPrevPage={handlePrevPage}
        goToNextPage={handleNextPage}
        pageNumber={pdfPageNumber}
        numPages={pdfNumPages}
        url={currentCourse.PDF_URL}
      />
    ) : (
      <Spinner />
    );
  } else section = quiz.length ? <Quiz quizData={quiz} /> : <Spinner />;
  return courses.length ? (
    <Course
      courseName={currCourseName}
      section={section}
      onTabChange={handleTabChange}
      showQuiz={quiz && quiz.length != 0}
      showVideo={currentCourse.VIDEO_URL ? true : false}
      tabValue={tabValue}
    />
  ) : (
    <Spinner />
  );
}

ManageCourse.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  currCourseName: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.courseId;
  const courseName = state.courses.length
    ? state.courses.find((c) => c.ID === courseId).NAME
    : '';
  return {
    courses: state.courses,
    currCourseName: courseName,
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  loadCourses: loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
