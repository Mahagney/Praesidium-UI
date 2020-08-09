//#region 'NPM DEP'
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core/styles';
//#endregion

//#region 'LOCAL DEP'
import setAuthorizationToken from './api/apiUtils';
import theme from './root/app-style';
import App from './root/app';
import './index.css';
import store from './redux/store';
import { setCurrentUser } from './redux/actions/user-action';
//#endregion

const token = localStorage.getItem('token');
if (token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
}

render(
  <ReduxProvider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </MuiThemeProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);
