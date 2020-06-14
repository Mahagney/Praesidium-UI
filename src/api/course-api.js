import axios from './axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export function getCoursesForUser(loggedUser) {
//   return wait(1)
//     .then(() => axios.get('/users/' + loggedUser.id + '/courses/uncompleted'))
//     .then((response) => {
//       if (response.status === 200) {
//         return response.data;
//       }
//       return null;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

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

export function addCourse(courseName, idCourseType, pdfFile) {
  var formData = new FormData();
  formData.append('name', courseName);
  formData.append('idCourseType', idCourseType);
  formData.append('pdf', pdfFile);

  return axios.post('/courses/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
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
  return axios.post('/courses/' + courseId + '/quiz', { quiz: quiz });
}

export function setVideoToCourse(courseId, videoFile) {
  var formData = new FormData();
  formData.append('video', videoFile);

  return axios.post('/courses/' + courseId + '/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function sendUserCompletion(courseId, userId, score) {
  return wait(1)
    .then(() =>
      axios.put('/courses/' + courseId + '/user/' + userId + '/complete', {
        score: score
      })
    )
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
