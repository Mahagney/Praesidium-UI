import { makeStyles } from '@material-ui/core/styles';

const useStylesUpdatePasswordForm = makeStyles((theme) => ({
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
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(6),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
  },
  logOutContainer:{
    display:'flex',
    width:'100%'
  },
  logOut: {
    marginLeft:'auto'
  }
}));

export default useStylesUpdatePasswordForm;
