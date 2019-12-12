//#region 'NPM DEP'
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import App from './root/app';
import './index.css';
import configureStore from './redux/configure-store';
//#endregion

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
