import { makeStyles } from '@material-ui/core/styles';

const useStylesRaports = makeStyles((theme) => ({
  bigContainer: {
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    minHeight: '500px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    padding: '40px',
  },
  smallContainer: {
    paddingTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginTop: theme.spacing(2),
    textAlign: 'left',
    width: 100,
  },
  button: {
    marginTop: theme.spacing(2),
    width: theme.spacing(20),
  },
}));

export default useStylesRaports;
