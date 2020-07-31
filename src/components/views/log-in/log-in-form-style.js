import { makeStyles } from '@material-ui/core/styles';

const useStylesLogInForm = makeStyles((theme) => ({
  bigContainer: {
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    height: '624px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4),
  },
  smallContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    flex: '1',
    height: '40px',
    width: '40px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStylesLogInForm;
