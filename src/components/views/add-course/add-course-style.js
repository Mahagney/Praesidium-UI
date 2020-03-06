import { makeStyles } from '@material-ui/core/styles';

const useStylesCourse = makeStyles((theme) => ({
  bigContainer: {
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    minHeight: '700px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'row'
  },
  smallContainer: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: 'center'
  },
  formControl: {
    marginTop: theme.spacing(2),
    textAlign: 'left',
    minWidth: 120
  },
  dropZone: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  removePadding: {
    paddingLeft: '0'
  }
}));

export default useStylesCourse;
