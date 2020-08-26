//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// material-ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkMaterial from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesLogInForm from './log-in-form-style';
import AlfaLogo from '../../common/logo-with-name';
//#endregion

function LogInForm({ onSubmit, onChange, emailValue, passwordValue, logging, errors }) {
  const classes = useStylesLogInForm();
  const { t } = useTranslation();
  return (
    <Container component="div" maxWidth="lg" className={classes.bigContainer}>
      <Container component="div" maxWidth="xs" className={classes.smallContainer}>
        {/* <LockIcon className={classes.logo} color='secondary' /> */}
        <AlfaLogo width={'120px'} height={'120px'} style={{ marginTop: '50px', marginBottom: '15px' }} />
        <Typography component="h1" variant="h5">
          {t('login:title')}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('login:email')}
            name="email"
            autoFocus
            value={emailValue || ''}
            onChange={onChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label={t('common:password')}
            type="password"
            id="password"
            autoComplete="new-password"
            value={passwordValue || ''}
            onChange={onChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="secondary" />} label={t('login:rememberMe')} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            disabled={logging}
          >
            {logging ? `${t('login:login')}...` : t('login:login')}
          </Button>
          <LinkMaterial href="#" variant="body2">
            {t('login:forgotPassword')}
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
  logging: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

LogInForm.defaultProps = {
  emailValue: '',
  passwordValue: '',
};
export default LogInForm;
