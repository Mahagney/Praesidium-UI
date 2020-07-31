/* eslint react/prop-types: 0 */

//#region 'NPM DEP'
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
//#endregion

//#region 'LOCAL DEP'
import theme from './app-style';
import { role } from '../constants';
import AppBar from '../components/common/app-bar';
import AppBarAdmin from '../components/common/app-bar-admin';
import ManageLogIn from '../components/controllers/log-in';
import ManageCourses from '../components/controllers/courses';
import ManageCompanies from '../components/controllers/companies';
import ManageUsers from '../components/controllers/users';
import PageNotFound from '../components/views/page-not-found';
import ManageCourse from '../components/controllers/course';
import ManageAssignCourse from '../components/controllers/assign-course';
import AddCourse from '../components/views/add-course';
import ManageUpdatePassword from '../components/controllers/update-password';
import ManageReports from '../components/controllers/reports';
//#endregion

function App({ isAuth, loggedUser, oneTimeAuth }) {
  let routes = (
    <Switch>
      <Route exact path="/" component={ManageLogIn} />
      <Redirect to="/" />
    </Switch>
  );

  const routesAdmin = (
    <>
      <AppBarAdmin />
      <Switch>
        <Route exact path="/" component={ManageLogIn} />
        <Route path="/courses/:courseId/assign" component={ManageAssignCourse} />
        <Route exact path="/courses/new" component={AddCourse} />
        <Route path="/courses/:courseId" component={ManageCourse} />
        <Route path="/courses" component={ManageCourses} />
        <Route path="/employees" component={ManageUsers} />
        <Route path="/companies" component={ManageCompanies} />
        <Route path="/reports" component={ManageReports} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );

  const routesUser = (
    <>
      <AppBar />
      <Switch>
        <Route exact path="/" component={ManageLogIn} />
        <Route path="/courses/:courseId" component={ManageCourse} />
        <Route path="/courses" component={ManageCourses} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );

  const routesOneTimeAuth = (
    <>
      <Switch>
        <Route exact path="/" component={ManageLogIn} />
        <Route path="/update-password" component={ManageUpdatePassword} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );

  if (isAuth) {
    if (loggedUser.role === role.ADMIN) {
      routes = oneTimeAuth ? routesAdmin : routesOneTimeAuth;
    } else {
      routes = oneTimeAuth ? routesUser : routesOneTimeAuth;
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>{routes}</SnackbarProvider>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.user.id,
    loggedUser: state.user,
    oneTimeAuth: state.user.one_time_auth,
  };
}

export default connect(mapStateToProps, null)(App);
