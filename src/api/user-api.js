import axios from './axios';
import setAuthorizationToken from './apiUtils';
import jwt from 'jsonwebtoken';
import {setError} from '../helpers/errorHelper';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getUsers() {
  return axios.get('/users').then((response) => {
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
                const token = res.data.token;
                localStorage.setItem('token', token);
                setAuthorizationToken(token);
                return jwt.decode(token);
            }
            return null;
        })
        .catch((error) => {
            let err = new Error(error);
            if (error.response && error.response.status === 401) {
                err.customMessage = 'Credentiale gresite.';
            } else {
                err.customMessage = 'Eroare la retea';
            }
            throw err;
        });
}

export function updateUser({ ID, FIRST_NAME, LAST_NAME, EMAIL, CNP }) {
  const form = new FormData();

  form.append("FIRST_NAME", FIRST_NAME);
  form.append("LAST_NAME", LAST_NAME);
  form.append("EMAIL", EMAIL);
  form.append("CNP", CNP);

  return axios.put('/users/' + ID, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function updatePassword(formData) {
    return axios.put('/auth/update-password', formData).then((res) => {
        if (res.status === 200) {
            console.log(res)
            return true
        }
        return null
    }).catch((err) => {
        throw setError(err)
    });
}