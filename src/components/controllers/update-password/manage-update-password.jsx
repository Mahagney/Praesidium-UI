//#region 'NPM DEP'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { connect } from 'react-redux'
//#endregion

//#region 'LOCAL DEP'
import UpdatePassForm from '../../views/update-password'
import { logOutUser } from '../../../redux/actions/user-action'
import { updatePassword } from '../../../api'
//#endregion

function ManageUpdatePassword({ loggedUser, logOutUser }) {
  const [formData, setFormData] = useState({
    email: loggedUser.email,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [updating, setUpdating] = useState(false)
  const [validations, setValidations] = useState({})
  const { enqueueSnackbar } = useSnackbar()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formIsValid()) return

    setUpdating(true)

    try {
      const result = await updatePassword(formData)
      if (result) {
        setUpdating(false)
        setTimeout(() => {
          logOutUser()
        }, 3000)
        enqueueSnackbar('Actualizare reusita! Va rugam sa va autentificati cu noua parola.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        })
      }
    } catch (error) {
      setUpdating(false)
      enqueueSnackbar(error.customMessage, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }

  function formIsValid() {
    const { currentPassword, newPassword, confirmNewPassword } = formData
    const validations = {}

    if (!currentPassword) validations.currentPassword = 'Completati parola curenta.'
    if (!newPassword) validations.newPassword = 'Completati parola noua.'
    if (!confirmNewPassword) validations.confirmNewPassword = 'Confirmati parola noua.'
    setValidations(validations)
    // Form is valid if the errors object still has no properties
    return Object.keys(validations).length === 0
  }

  return (
    <UpdatePassForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      formData={formData}
      errors={validations}
      updating={updating}
    />
  )
}

ManageUpdatePassword.propTypes = {
  loggedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    one_time_auth: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  logOutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.user,
  }
}

const mapDispatchToProps = {
  logOutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUpdatePassword)
