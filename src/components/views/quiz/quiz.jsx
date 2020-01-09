//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesQuiz from './quiz-style';
import QuestionCount from './question-count';
import Question from './question';
import Answers from './answers';
//#endregion

function Quiz() {
  const classes = useStylesQuiz();

  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      <QuestionCount counter={0} total={0}/>
      <Question content={"Which of these racing franchises would you prefer to play a game from?"}/>
      <Answers/>
    </Container>
  );
}

Quiz.propTypes = {};

export default Quiz;
