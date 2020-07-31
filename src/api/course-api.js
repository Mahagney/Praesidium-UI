import axios from './axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getCoursesForAdmin() {
  return wait(1)
    .then(() => axios.get('/courses/'))
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

export function APIgetCourseByIdForAdmin(courseId) {
  return wait(1)
    .then(() => axios.get('/courses/' + courseId))
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

export function addCourse({ courseName, idCourseType, pdfFile, quiz, videoCourse }) {
  const formData = new FormData();
  formData.append('name', courseName);
  formData.append('idCourseType', idCourseType);
  formData.append('pdf', pdfFile);
  if (quiz && quiz.length > 0) formData.append('quiz', JSON.stringify(quiz));
  if (videoCourse && videoCourse[0]) formData.append('video', videoCourse[0]);

  return axios.post('/courses/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getQuizByCourseId(courseId) {
  return wait(1)
    .then(() => axios.get('/courses/' + courseId + '/quiz'))
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

export function setQuizToCourse(courseId, quiz) {
  return axios.post('/courses/' + courseId + '/quiz', {
    quiz,
  });
}

export function setVideoToCourse(courseId, videoFile) {
  const formData = new FormData();
  formData.append('video', videoFile);

  return axios.post('/courses/' + courseId + '/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function sendUserCompletion(courseId, userId, score) {
  const response = await axios.put('/courses/' + courseId + '/user/' + userId + '/complete', {
    score,
  });
  if (response.status === 200) {
    return response.data;
  }
  return null;
}
export function getCourseTypes() {
  return wait(1)
    .then(() => axios.get('/courses/types'))
    .then((response) => {
      if (response.status === 200 || response.status === 304) {
        return response.data.courseTypes;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteCourse(courseId) {
  return axios.delete('/courses/' + courseId);
}
