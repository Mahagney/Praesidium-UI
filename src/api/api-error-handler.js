import { apiCallError } from '../redux/actions/api-action';
import store from '../redux/store';

export default (error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)
    store.dispatch(apiCallError(error.response.data.customMessage));
  } else if (error.request) {
    // client never received a response, or request never left
    store.dispatch(apiCallError('Eroare la server.'));
  } else {
    //unexpected error
  }
};
