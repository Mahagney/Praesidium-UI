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

function LogOut({ logOutUserAction, size, color }) {
  function handleLogOut() {
    logOutUserAction();
  }

  return (
    <Tooltip title="Deconectare">
      <IconButton color="inherit" onClick={handleLogOut}>
        <LockOpenIcon fontSize={size} color={color} />
      </IconButton>
    </Tooltip>
  );
}

LogOut.propTypes = {
  logOutUserAction: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

LogOut.defaultProps = {
  size: 'default',
  color: 'inherit',
};

const mapDispatchToProps = {
  logOutUserAction: logOutUser,
};

export default connect(null, mapDispatchToProps)(LogOut);
