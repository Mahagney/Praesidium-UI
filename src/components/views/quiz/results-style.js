import { makeStyles } from '@material-ui/core/styles';

const useStylesResults = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    position: 'relative'
  },
  result: {
    position: 'relative',
    fontSize: '80px',
    fontWeight: 'bold',
    color: theme.palette.secondary.main
  },
  backButton: {
    position: 'absolute',
    left: '0px',
    top: '20px'
  },
  linkToCourses: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    fontSize: '20px',
    textDecoration: 'none'
  },
  retry: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    fontSize: '20px',
    cursor: 'pointer'
  }
}));

export default useStylesResults;
