//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesQuiz from './quiz-style';
//#endregion

function Quiz() {
  const classes = useStylesQuiz();
  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      <p>QUIZZ</p>
    </Container>
  );
}

Quiz.propTypes = {};

export default Quiz;
