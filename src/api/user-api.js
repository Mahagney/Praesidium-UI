import jwt from 'jsonwebtoken';
import axios from './axios';
import setAuthorizationToken from './apiUtils';
import setError from '../helpers/errorHelper';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//#region 'USER specific data'
export function getUsers() {
  return axios
    .get('/users')
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

export function deleteUser(userId) {
  return axios.delete('/users/' + userId);
}

export function logIn(user) {
  return wait(2000)
    .then(() => axios.post('/auth/login', user))
    .then((res) => {
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        return jwt.decode(token);
      }
      return null;
    })
    .catch((error) => {
      const err = new Error(error);
      if (error.response && error.response.status === 401) {
        err.customMessage = 'Credentiale gresite.';
      } else {
        console.log(error);
        err.customMessage = 'Eroare la retea';
      }
      throw err;
    });
}

export function createUser({ FIRST_NAME, LAST_NAME, EMAIL, CNP, ID_COMPANY, ID_EMPLOYEE_TYPE }) {
  const form = new FormData();

  form.append('FIRST_NAME', FIRST_NAME);
  form.append('LAST_NAME', LAST_NAME);
  form.append('EMAIL', EMAIL);
  form.append('CNP', CNP);
  form.append('ID_COMPANY', ID_COMPANY);
  form.append('ID_EMPLOYEE_TYPE', ID_EMPLOYEE_TYPE);

  return axios.post('/users', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updateUser({ ID, FIRST_NAME, LAST_NAME, EMAIL, CNP, ID_COMPANY }) {
  const form = new FormData();

  form.append('FIRST_NAME', FIRST_NAME);
  form.append('LAST_NAME', LAST_NAME);
  form.append('EMAIL', EMAIL);
  form.append('CNP', CNP);
  form.append('ID_COMPANY', ID_COMPANY);

  return axios.put('/users/' + ID, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updateUserEmployeeType(ID_USER, ID_EMPLOYEE_TYPE) {
  const form = new FormData();

  form.append('employeeTypeId', ID_EMPLOYEE_TYPE);

  return axios.put('/users/' + ID_USER + '/employeeType', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updatePassword(formData) {
  return axios
    .put('/auth/update-password', formData)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      return null;
    })
    .catch((err) => {
      throw setError(err);
    });
}
//#endregion

//#region 'USER course data'
export function APIgetCoursesForUser(loggedUser) {
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

export async function APIgetCourseByIdForUser(courseId, loggedUser) {
  const course = await axios.get('/users/' + loggedUser.id + '/course/' + courseId);
  return course.data;
}
//#endregion
