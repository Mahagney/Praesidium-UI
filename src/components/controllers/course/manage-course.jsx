//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import PageNotFound from '../../views/page-not-found';
import Course from '../../views/course';
import Spinner from '../../common/spinner';
import PdfViewer from '../../views/pdf';
import VideoPlayer from '../../views/video';
import ManageQuiz from '../quiz/manage-quiz';
import CourseEnd from '../../views/quiz/courseEnd';
import { completeCourse, deleteCourse } from '../../../redux/actions/course-action';
import { getQuizByCourseId, APIgetCourseByIdForAdmin } from '../../../api/course-api';
import { APIgetCourseByIdForUser } from '../../../api/user-api';
import { tabIndex } from '../../common/tab';
import { role } from '../../../constants';
import withAdmin from '../../hoc/with-Admin';
//#endregion
function ManageCourse({ history, match, loggedUser, completeCourseAction, isAdmin, deleteCourseAction }) {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [pdfNumPages, setPdfNumPages] = useState(1);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    //Using an async function makes the callback function return a Promise instead of a cleanup function.
    //So we need to use this technique to use async await in 'useEffect'
    //DOC 'useEffect'===> https://reactjs.org/docs/hooks-reference.html#useeffect
    async function loadCourse() {
      let course;
      if (loggedUser.role === role.ADMIN) {
        course = await APIgetCourseByIdForAdmin(match.params.courseId);
      } else {
        try {
          course = await APIgetCourseByIdForUser(match.params.courseId, loggedUser);
        } catch (error) {
          history.push('/courses/');
        }
      }
      if (course != null) {
        setCurrentCourse(course);
        setSelectedTab(course.VIDEO_URL ? tabIndex.VIDEO : tabIndex.PDF);
      }

      const currentQuiz = await getQuizByCourseId(match.params.courseId);
      setQuiz(currentQuiz);
    }
    loadCourse();
  }, []);

  const redirectToAssignCourse = () => {
    history.push('/courses/' + match.params.courseId + '/assign');
  };

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
    setSelectedTab(value);
  }

  let section = null;

  if (currentCourse != null) {
    switch (selectedTab) {
      case tabIndex.VIDEO: {
        section = currentCourse.VIDEO_URL ? <VideoPlayer videoUrl={currentCourse.VIDEO_URL} /> : <Spinner />;

        break;
      }
      case tabIndex.PDF: {
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

        break;
      }
      case tabIndex.QUIZ: {
        if (currentCourse && quiz !== null && quiz.length === 0) {
          section = (
            <CourseEnd
              onCourseCompletion={() => {
                completeCourseAction(match.params.courseId, loggedUser, 100).then(history.push('/courses'));
              }}
            />
          );
        } else {
          section = quiz.length ? (
            <ManageQuiz
              quizData={quiz}
              onCompletion={(score) => {
                completeCourseAction(match.params.courseId, loggedUser, score);
              }}
            />
          ) : (
            <Spinner />
          );
        }
        break;
      }
      default: {
        return <PageNotFound />;
      }
    }

    const removeCourse = () => deleteCourseAction(currentCourse.ID).then(() => history.push('/courses'));

    return (
      <Course
        redirectToAssignCourse={redirectToAssignCourse}
        courseName={currentCourse.NAME}
        section={section}
        onTabChange={handleTabChange}
        showQuiz={true}
        showVideo={!!currentCourse.VIDEO_URL}
        tabValue={selectedTab}
        showAdminButtons={isAdmin}
        deleteCourse={removeCourse}
      />
    );
  }
  return <Spinner />;
}

ManageCourse.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  completeCourseAction: PropTypes.func.isRequired,
  deleteCourseAction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
  };
}

const mapDispatchToProps = {
  completeCourseAction: completeCourse,
  deleteCourseAction: deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(withAdmin(ManageCourse));
