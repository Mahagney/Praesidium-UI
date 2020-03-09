import axios from './axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getCourses(loggedUser) {
  return wait(1)
    .then(() => axios.get('/users/' + loggedUser.id + '/courses/uncompleted'))
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
      if (response.status === 200) {
        return response.data.courseTypes;
      }
      return null;
    })
    .catch((error) => {
      throw error;
    });
}
