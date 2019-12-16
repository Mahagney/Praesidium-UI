import axios from './axios';

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

export function logIn(user) {
  return wait(2000)
    .then(() => axios.post('/auth/login', user))
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return response.data.user;
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
