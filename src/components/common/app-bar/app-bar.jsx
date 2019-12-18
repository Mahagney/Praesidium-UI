//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import AppBarMui from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
//#endregion

//#region 'LOCAL DEP'
import useStylesAppBar from './app-bar-style';
//#endregion

function AppBar({ history }) {
  const classes = useStylesAppBar();

  function handleLogOut() {
    console.log('logOut');
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
  history: PropTypes.object.isRequired
};

export default AppBar;
