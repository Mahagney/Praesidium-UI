import { makeStyles } from '@material-ui/core/styles';

const useSpinnerStyles = makeStyles((theme) => ({
  spinnerContainer: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default useSpinnerStyles;
