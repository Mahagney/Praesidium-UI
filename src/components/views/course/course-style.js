import { makeStyles } from '@material-ui/core/styles';

const useStylesCourse = makeStyles((theme) => ({
  bigContainer: {
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    height: '550px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4),
    position: 'relative'
  },
  title: {
    marginTop: theme.spacing(4),
    position: 'absolute'
  },
  tabs: {
    position: 'absolute',
    bottom: '0'
  }
}));

export default useStylesCourse;
