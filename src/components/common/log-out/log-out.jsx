//#region 'NPM DEP'
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
//#endregion

//#region 'LOCAL DEP'
import { logOutUser } from '../../../redux/actions/user-action';
//#endregion

function LogOut({ logOutUser, size, color }) {

  function handleLogOut() {
    logOutUser();
  }

  return (
    <Tooltip title='Deconectare'>
      <IconButton color='inherit' onClick={handleLogOut}>
        <LockOpenIcon fontSize={size} color={color}/>
      </IconButton>
    </Tooltip>
  );
}

LogOut.propTypes = {
  logOutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logOutUser,
};

export default connect(null, mapDispatchToProps)(LogOut);
