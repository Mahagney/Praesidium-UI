import axios from './axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getCourses(loggedUser) {
  return wait(1)
    .then(() => axios.get('/users/' + loggedUser.id + '/courses'))
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

export function getCourseById(courseId) {
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

export function sendUserCompletion(courseId, userId, score) {
  return wait(1)
    .then(() =>
      axios.post('/courses/' + courseId + '/user/' + userId, { score: score })
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
