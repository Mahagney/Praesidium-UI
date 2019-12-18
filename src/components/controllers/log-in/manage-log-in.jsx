//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// redux
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setLogging(true);
    logIn(user).catch((error) => {
      setLogging(false);
      enqueueSnackbar(error.customMessage, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
    });
  }

  function formIsValid() {
    const { email, password } = user;
    const validations = {};

    if (!email) validations.email = 'Completati adresa de email.';
    if (!password) validations.password = 'Completati parola.';

    setValidations(validations);
    // Form is valid if the errors object still has no properties
    return Object.keys(validations).length === 0;
  }

  const logInForm = (
    <LogInForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      emailValue={user.email}
      passwordValue={user.password}
      logging={logging}
      errors={validations}
    ></LogInForm>
  );

  return isAuth ? (
    <Redirect to={'/users/' + loggedUser.id + '/courses'} />
  ) : (
    logInForm
  );
}

ManageLogIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    isAuth: state.user.id ? true : false
  };
}

const mapDispatchToProps = {
  logIn: userActions.logIn
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLogIn);
