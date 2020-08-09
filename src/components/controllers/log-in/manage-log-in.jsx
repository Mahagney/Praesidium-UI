//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import LogInForm from '../../views/log-in';
import * as userActions from '../../../redux/actions/user-action';
//#endregion

function ManageLogIn({ isAuth, loggedUser, logIn }) {
  const [user, setUser] = useState({});
  const [logging, setLogging] = useState(false);
  const [validations, setValidations] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setLogging(true);

    try {
      await logIn(user);
    } catch (error) {
      setLogging(false);
    }
  }

  function formIsValid() {
    const { email, password } = user;
    const validationResults = {};

    if (!email) validationResults.email = 'Completati adresa de email.';
    if (!password) validationResults.password = 'Completati parola.';

    setValidations(validationResults);
    // Form is valid if the errors object still has no properties
    return Object.keys(validationResults).length === 0;
  }

  if (isAuth && loggedUser.one_time_auth) {
    return <Redirect to="/courses" />;
  }
  if (isAuth && !loggedUser.one_time_auth) {
    return <Redirect to="/update-password" />;
  }
  return (
    <LogInForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      emailValue={user.email}
      passwordValue={user.password}
      logging={logging}
      errors={validations}
    />
  );
}

ManageLogIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    isAuth: !!state.user.id,
  };
}

const mapDispatchToProps = {
  logIn: userActions.logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLogIn);
