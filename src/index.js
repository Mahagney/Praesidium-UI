//#region 'NPM DEP'
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './api/apiUtils';
//#endregion

//#region 'LOCAL DEP'
import App from './root/app';
import './index.css';
import configureStore from './redux/configure-store';
import { setCurrentUser } from './redux/actions/user-action';
//#endregion

const store = configureStore();
const token = localStorage.getItem('token');
if (token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
}

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);
