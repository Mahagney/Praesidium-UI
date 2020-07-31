export default function setError(error) {
  const err = new Error();
  if (!error.response && error.message === 'Network Error') {
    err.customMessage = 'Eroare la retea!';
  } else {
    const { data } = error.response;
    if (data.errorMessage) {
      err.customMessage = data.errorMessage;
    } else if (data.customMessage) {
      err.customMessage = data.customMessage;
    }
  }
  return err;
}
