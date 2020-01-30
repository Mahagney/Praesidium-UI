import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Replay from '@material-ui/icons/Replay';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
  }
}));

export default function Result() {
  const classes = useStyles();
  const [progress, setProgress] = useState(40);
  const message =
    progress > 50
      ? 'Felicitari, ai trecut testul!'
      : 'Punctaj insuficient, te rugam sa reincerci!';
  let left = progress === 100 ? '12%' : '20%';
  left = progress < 10 ? '30%' : left;

  let linkButton = null;
  if (progress > 50) {
    linkButton = (
      <Fragment>
        <ArrowBackIos></ArrowBackIos>
        <p>Cursurile mele</p>
      </Fragment>
    );
  } else {
    linkButton = (
      <Fragment>
        <Replay></Replay>
        <p>Reincearca</p>
      </Fragment>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <Link
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'black',
            fontSize: '20px',
            textDecoration: 'none'
          }}
          to={'/users/3/courses'}
        >
          {linkButton}
        </Link>
      </div>
      <h1>{message}</h1>
      {/* <IconButton aria-label='delete' className={classes.margin} size='large'>
        <Replay fontSize='large' color='primary' />
      </IconButton> */}
      <div
        style={{
          paddingBottom: '40px',
          display: 'flex'
        }}
      ></div>

      <div className={classes.result}>
        <CircularProgress
          variant='static'
          value={progress}
          color='primary'
          size='250px'
        />
        <div style={{ position: 'absolute', top: '28%', left: left }}>
          <p>{progress + '%'}</p>
        </div>
      </div>
    </div>
  );
}
