//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import LogInForm from '../../views/log-in';
import * as userActions from '../../../redux/actions/user-action';
//#endregion

function ManageLogIn({ history, loggedUser, logIn }) {
  const [user, setUser] = useState({});
  const [logging, setLogging] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(value);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLogging(true);
    logIn(user).catch(() => {
      setLogging(false);
    });
  }

  return loggedUser.id ? (
    <Redirect to={'/users/' + loggedUser.id + '/courses'} />
  ) : (
    <LogInForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      emailValue={user.email}
      passwordValue={user.password}
      logging={logging}
    ></LogInForm>
  );
}

ManageLogIn.propTypes = {
  history: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  debugger;
  return {
    loggedUser: state.user
  };
}

const mapDispatchToProps = {
  logIn: userActions.logIn
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLogIn);
