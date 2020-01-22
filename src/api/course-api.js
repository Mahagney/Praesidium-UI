import axios from './axios';

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

export function getCourses(loggedUser) {
  return wait(2000)
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
  return wait(2000)
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
