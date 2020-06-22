import { makeStyles } from '@material-ui/core/styles';

const useStylesVideoPlayer = makeStyles((theme) => ({
  videoButtonsContainer: {
    margin: '0 auto',
    marginTop: theme.spacing(3)
  },
  videoPlayer: {
    margin: '0 auto',
    marginTop: '24px', 
    maxWidth: '100%',
  }
}));

export default useStylesVideoPlayer;
