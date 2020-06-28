//#region 'NPM DEP'
import jwt from 'jsonwebtoken';
//#endregion

//#region 'LOCAL DEP'
import axios from './axios';
import setAuthorizationToken from './apiUtils';
import apiErrorHandler from './api-error-handler';
//#endregion

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

export async function APIlogIn(user) {
  const response = await axios.post('/auth/login', user);
  const { token } = response.data;
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
  return jwt.decode(token);
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

export async function APIupdatePassword(formData) {
  try {
    const response = await axios.put('/auth/update-password', formData);
    if (response.status === 200) {
      return true;
    }
    return null;
  } catch (error) {
    apiErrorHandler(error);
  }
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
