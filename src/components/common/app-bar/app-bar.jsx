//#region 'NPM DEP'
import React from 'react';
import { Link } from 'react-router-dom';
import AppBarMui from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//#endregion

//#region 'LOCAL DEP'
import useStylesAppBar from './app-bar-style';
import AlfaLogo from '../logo';
import LogOut from '../log-out';
//#endregion

function AppBar() {
  const classes = useStylesAppBar();

  return (
    <span className={classes.root}>
      <AppBarMui color="primary">
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/courses">
              <AlfaLogo width={'45px'} height={'45px'} style={{ marginTop: '10px' }} />
            </Link>
          </div>
          <span className={classes.logOut}>
            <LogOut />
          </span>
        </Toolbar>
      </AppBarMui>
      <Toolbar />
    </span>
  );
}

export default AppBar;
