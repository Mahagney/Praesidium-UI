//#region 'NPM DEP'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
//#endregion

//#region 'LOCAL DEP'
import theme from './app-style';
import ManageLogIn from '../components/controllers/log-in';
import ManageCourses from '../components/controllers/courses';
import PageNotFound from '../components/views/page-not-found';
//#endregion

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/' component={ManageLogIn} />
        <Route path='/users/:userId/courses' component={ManageCourses} />
        <Route component={PageNotFound} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
