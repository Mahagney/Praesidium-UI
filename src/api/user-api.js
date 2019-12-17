import axios from './axios';
import setAuthorizationToken from './apiUtils';
import jwt from 'jsonwebtoken';

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

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
