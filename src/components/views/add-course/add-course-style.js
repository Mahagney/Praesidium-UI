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
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  },
  flexRowContainer: {
    paddingBottom: theme.spacing(6),
    display: 'flex',
    padding: '0',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  smallContainer: {
    marginTop: '40px',
    display: 'flex',
    margin: '5%',
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
    minWidth: 140
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
