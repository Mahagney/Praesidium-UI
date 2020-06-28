//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
import UpdatePassForm from '../../views/update-password';
import { logOutUser } from '../../../redux/actions/user-action';
import { APIupdatePassword } from '../../../api';
//#endregion

function ManageUpdatePassword({ loggedUser, logOut }) {
  const [formData, setFormData] = useState({
    email: loggedUser.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [updating, setUpdating] = useState(false);
  const [validations, setValidations] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    setUpdating(true);

    const result = await APIupdatePassword(formData);
    setUpdating(false);
    if (result) {
      setTimeout(() => {
        logOut();
      }, 3000);
      enqueueSnackbar('Actualizare reusita! Va rugam sa va autentificati cu noua parola.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
    }
  }

  function formIsValid() {
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    const validationResult = {};

    if (!currentPassword) validationResult.currentPassword = 'Completati parola curenta.';
    if (!newPassword) validationResult.newPassword = 'Completati parola noua.';
    if (!confirmNewPassword) validationResult.confirmNewPassword = 'Confirmati parola noua.';
    setValidations(validationResult);
    // Form is valid if the errors object still has no properties
    return Object.keys(validationResult).length === 0;
  }

  return (
    <UpdatePassForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      formData={formData}
      errors={validations}
      updating={updating}
    />
  );
}

ManageUpdatePassword.propTypes = {
  loggedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    one_time_auth: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.user,
  };
};

const mapDispatchToProps = {
  logOut: logOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUpdatePassword);
