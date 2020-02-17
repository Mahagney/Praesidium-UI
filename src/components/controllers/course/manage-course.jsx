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
import CourseEnd from '../../views/quiz/courseEnd';
import {
  loadCourses,
  completeCourse
} from '../../../redux/actions/course-action';
import { getQuizByCourseId, getCourseById } from '../../../api/course-api';
//#endregion
function ManageCourse({
  history,
  match,
  loadCourses,
  loggedUser,
  courses,
  currCourseName,
  completeCourse
}) {
  const [currentCourse, setCurrentCourse] = useState({});
  const [pdfNumPages, setPdfNumPages] = useState(1);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [quiz, setQuiz] = useState(null);

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
  } else if (currentCourse && quiz !== null && quiz.length === 0) {
    section = (
      <CourseEnd
        sendResponse={() => {
          completeCourse(match.params.courseId, loggedUser.id, 0).then(
            history.push('/courses')
          );
        }}
      />
    );
  } else {
    section = quiz.length ? (
      <Quiz
        quizData={quiz}
        onCompletion={(score) => {
          completeCourse(match.params.courseId, loggedUser.id, score);
        }}
      />
    ) : (
      <Spinner />
    );
  }

  return courses.length ? (
    <Course
      courseName={
        currentCourse && currentCourse.NAME
          ? currentCourse.NAME
          : currCourseName
      }
      section={section}
      onTabChange={handleTabChange}
      showQuiz={true}
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
  currCourseName: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  completeCourse: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.courseId;
  const course = state.courses.length
    ? state.courses.find((c) => c.ID === courseId)
    : undefined;
  const courseName = course ? course.NAME : '';
  return {
    courses: state.courses,
    currCourseName: courseName,
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  loadCourses: loadCourses,
  completeCourse: completeCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
