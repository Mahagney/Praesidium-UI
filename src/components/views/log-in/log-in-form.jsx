//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkMaterial from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockIcon from '@material-ui/icons/Lock';
//#endregion

//#region 'LOCAL DEP'
import useStylesLogInForm from './log-in-form-style';
//#endregion

function LogInForm({ onSubmit, onChange, emailValue, passwordValue, logging }) {
  const classes = useStylesLogInForm();
  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      <Container
        component='div'
        maxWidth='xs'
        className={classes.smallContainer}
      >
        <LockIcon className={classes.logo} color='secondary' />
        <Typography component='h1' variant='h5'>
          Autentificare
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email'
            name='email'
            autoFocus
            value={emailValue || ''}
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Parola'
            type='password'
            id='password'
            autoComplete='new-password'
            value={passwordValue || ''}
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='secondary' />}
            label='Tine-ma minte'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submitBtn}
            disabled={logging}
          >
            {logging ? 'Logare...' : 'Logare'}
          </Button>
          <LinkMaterial href='#' variant='body2'>
            {'Ati uitat parola?'}
          </LinkMaterial>
        </form>
      </Container>
    </Container>
  );
}

LogInForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  logging: PropTypes.bool.isRequired
};

LogInForm.defaultProps = {
  emailValue: '',
  passwordValue: ''
};
export default LogInForm;
