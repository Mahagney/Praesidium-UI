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
import ManageLogIn from '../components/controllers/log-in';
import ManageCourses from '../components/controllers/courses';
import PageNotFound from '../components/views/page-not-found';
//#endregion

function App({ isAuth }) {
  let routes = (
    <Switch>
      <Route exact path='/' component={ManageLogIn} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <>
        <AppBar />
        <Switch>
          <Route exact path='/' component={ManageLogIn} />
          <Route path='/users/:userId/courses' component={ManageCourses} />
          <Route component={PageNotFound} />
        </Switch>
      </>
    );
  }
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>{routes}</SnackbarProvider>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuth: state.user.id ? true : false
  };
}

export default connect(mapStateToProps, null)(App);
