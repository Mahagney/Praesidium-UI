//#region 'NPM DEP'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBarMui from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
//#endregion

//#region 'LOCAL DEP'
import useStylesAppBar from './app-bar-style';
import { logOutUser } from '../../../redux/actions/user-action';
import { emptyCourses } from '../../../redux/actions/course-action';
//#endregion

function AppBar({ logOutUser, emptyCourses }) {
  const classes = useStylesAppBar();

  function handleLogOut() {
    localStorage.removeItem('token');
    logOutUser();
    emptyCourses();
  }
  return (
    <div className={classes.root}>
      <AppBarMui color='primary'>
        <Toolbar>
          <div className={classes.logo}>Logo</div>
          <span className={classes.logOut}>
            <Tooltip title='Delogare'>
              <IconButton color='inherit' onClick={handleLogOut}>
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          </span>
        </Toolbar>
      </AppBarMui>
      <Toolbar />
    </div>
  );
}

AppBar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  emptyCourses: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logOutUser,
  emptyCourses
};

export default connect(null, mapDispatchToProps)(AppBar);
