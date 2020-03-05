//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
//#endregion

//#region 'LOCAL DEP'
import theme from './app-style';
import AppBar from '../components/common/app-bar';
import AppBarAdmin from '../components/common/app-bar-admin';
import ManageLogIn from '../components/controllers/log-in';
import ManageCourses from '../components/controllers/courses';
import PageNotFound from '../components/views/page-not-found';
import ManageCourse from '../components/controllers/course';
//#endregion

function App({ isAuth, userId }) {
  let routes = (
    <Switch>
      <Route exact path='/' component={ManageLogIn} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuth) {
    if (userId == 3) {
      routes = (
        <>
          <AppBarAdmin />
          <Switch>
            <Route exact path='/' component={ManageLogIn} />
            <Route exact path='/courses/new' component={PageNotFound} />
            <Route path='/courses/:courseId' component={ManageCourse} />
            <Route path='/courses' component={ManageCourses} />
            <Route component={PageNotFound} />
          </Switch>
        </>
      );
    } else {
      routes = (
        <>
          <AppBar />
          <Switch>
            <Route exact path='/' component={ManageLogIn} />
            <Route path='/courses/:courseId' component={ManageCourse} />
            <Route path='/courses' component={ManageCourses} />
            <Route component={PageNotFound} />
          </Switch>
        </>
      );
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>{routes}</SnackbarProvider>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isAuth: state.user.id ? true : false,
    userId: state.user.id
  };
}

export default connect(mapStateToProps, null)(App);
