//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesUpdatePasswordForm from './update-password-form-style';
import LogOut from '../../common/log-out';
//#endregion

function UpdatePasswordForm({ onSubmit, onChange, formData, errors, updating }) {
  const classes = useStylesUpdatePasswordForm();
  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
        <div className={classes.logOutContainer}>
          <span className={classes.logOut}>
            <LogOut size='large'color='primary'/>
          </span>
         </div>
      <Container component='div' maxWidth='xs' className={classes.smallContainer}>
        <Typography component='h1' variant='h5' className={classes.title}>
          Actualizare parola
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='currentPassword'
            label='Parola curenta'
            type='password'
            id='currentPassword'
            autoComplete='new-password'
            value={formData.currentPassword || ''}
            onChange={onChange}
            error={errors.currentPassword ? true : false}
            helperText={errors.currentPassword}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='newPassword'
            label='Parola noua'
            type='password'
            id='newPassword'
            autoComplete='new-password'
            value={formData.newPassword || ''}
            onChange={onChange}
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='confirmNewPassword'
            label='Confirmati parola noua'
            type='password'
            id='confirmNewPassword'
            autoComplete='new-password'
            value={formData.confirmNewPassword || ''}
            onChange={onChange}
            error={errors.confirmNewPassword ? true : false}
            helperText={errors.confirmNewPassword}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submitBtn}
            disabled={updating}
          >
            {updating ? 'Actualizeaza...' : 'Actualizeaza'}
          </Button>
        </form>
      </Container>
    </Container>
  );
}

UpdatePasswordForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UpdatePasswordForm;
