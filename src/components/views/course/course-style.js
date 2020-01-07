import { makeStyles } from '@material-ui/core/styles';

const useStylesCourse = makeStyles((theme) => ({
  bigContainer: {
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    minHeight: '600px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: 'center'
  }
}));

export default useStylesCourse;
