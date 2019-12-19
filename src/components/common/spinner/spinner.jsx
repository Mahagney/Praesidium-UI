//#region 'NPM DEP'
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//#endregion

//#region 'LOCAL DEP'
import useSpinnerStyles from './spinner-style';
//#endregion

function Spinner() {
  const classes = useSpinnerStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress
        variant='determinate'
        value={progress}
        color='secondary'
        size={100}
      />
    </div>
  );
}

export default Spinner;
