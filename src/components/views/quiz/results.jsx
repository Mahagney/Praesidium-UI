import React, { useState, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Replay from '@material-ui/icons/Replay';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import useStylesQuiz from './quiz-style';
import resultsStyle from './results-style';

export default function Result({ retryQuiz, quizResult }) {
  const classes = resultsStyle();
  const containerClass = useStylesQuiz();

  const message =
    quizResult > 50
      ? 'Felicitari, ai trecut testul!'
      : 'Punctaj insuficient, te rugam sa reincerci!';
  let left = quizResult === 100 ? '12%' : '20%';
  left = quizResult < 10 ? '30%' : left;

  let linkButton = null;
  let redColor = '';

  if (quizResult > 50) {
    linkButton = (
      <Link className={classes.linkToCourses} to={'/users/3/courses'}>
        <ArrowBackIos></ArrowBackIos>
        <p>Cursurile mele</p>
      </Link>
    );
  } else {
    redColor = 'red';
    linkButton = (
      <div className={classes.retry} onClick={retryQuiz}>
        <Replay></Replay>
        <p>Reincearca</p>
      </div>
    );
  }

  return (
    <Container className={containerClass.quizContainer}>
      <div className={classes.root}>
        <div className={classes.backButton}>{linkButton}</div>
        <h1>{message}</h1>
        <div
          style={{
            paddingBottom: '40px',
            display: 'flex'
          }}
        ></div>

        <div className={classes.result} style={{ color: redColor }}>
          <CircularProgress
            variant='static'
            value={quizResult}
            color='primary'
            size='250px'
          />
          <div style={{ position: 'absolute', top: '28%', left: left }}>
            <p>{quizResult + '%'}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
