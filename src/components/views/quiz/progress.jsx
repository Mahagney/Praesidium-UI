import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularStatic({ quizResult }) {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((prevCompleted) => (prevCompleted >= quizResult ? quizResult : prevCompleted + 5));
    }

    const timer = setInterval(progress, 70);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <CircularProgress variant="static" value={completed} color="primary" size="250px" />
    </div>
  );
}

CircularStatic.propTypes = {
  quizResult: PropTypes.number.isRequired,
};
