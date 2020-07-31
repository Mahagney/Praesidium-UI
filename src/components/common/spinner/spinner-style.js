import { makeStyles } from '@material-ui/core/styles';

const useSpinnerStyles = makeStyles((theme) => ({
  spinnerContainer: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useSpinnerStyles;
