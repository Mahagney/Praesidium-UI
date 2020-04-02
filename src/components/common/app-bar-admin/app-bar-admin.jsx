//#region 'NPM DEP'
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBarMui from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//#endregion

//#region 'LOCAL DEP'
import useStylesAppBar from './app-bar-admin-style';
import { logOutUser } from '../../../redux/actions/user-action';
import AlfaLogo from '../logo';
//#endregion

function AppBar({ history, logOutUser }) {
  const classes = useStylesAppBar();
  const [value, setValue] = useState(0);

  function handleLogOut() {
    localStorage.removeItem('token');
    logOutUser();
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const adminTabs = ['/courses', '/companies', '/reports'];
  const handleChange = (event, newValue) => {
    history.push(adminTabs[newValue]);
    setValue(newValue);
  };

  return (
    <span className={classes.root}>
      <AppBarMui color='primary'>
        <Toolbar>
          <div className={classes.logo} onClick={() => handleChange(null, 0)} style={{
            cursor: "pointer"
          }}>
            <AlfaLogo
              width={'45px'}
              height={'45px'}
              style={{ marginTop: '10px' }}
            />
          </div>
          <Tabs
            TabIndicatorProps={{ style: { background: 'white' } }}
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
          >
            <Tab label='Cursuri' onChange={handleChange} {...a11yProps(0)} />
            <Tab label='Firme' onChange={handleChange} {...a11yProps(1)} />
            <Tab label='Rapoarte' onChange={handleChange} {...a11yProps(2)} />
          </Tabs>

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
  logOutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  logOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBar));
