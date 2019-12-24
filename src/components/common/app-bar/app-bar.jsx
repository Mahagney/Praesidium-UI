//#region 'NPM DEP'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBarMui from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
//#endregion

//#region 'LOCAL DEP'
import useStylesAppBar from './app-bar-style';
import { logOutUser } from '../../../redux/actions/user-action';
//#endregion

function AppBar({ loggedUser, logOutUser }) {
  const classes = useStylesAppBar();

  function handleLogOut() {
    localStorage.removeItem('token');
    logOutUser();
  }

  return (
    <span className={classes.root}>
      <AppBarMui color='primary'>
        <Toolbar>
          <div className={classes.logo}>
            <Link to={'/users/' + loggedUser.id + '/courses'}>
              <button type='button'>Logo</button>
            </Link>
          </div>
          <span className={classes.logOut}>
            <Tooltip title='Deconectare'>
              <IconButton color='inherit' onClick={handleLogOut}>
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          </span>
        </Toolbar>
      </AppBarMui>
      <Toolbar />
    </span>
  );
}

AppBar.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  logOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
