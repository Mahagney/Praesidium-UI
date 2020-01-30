//#region 'NPM DEP'
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesQuiz from './quiz-style';
import QuestionCount from './question-count';
import Question from './question';
import Answers from './answers';
import Results from './results';
//#endregion

function Quiz({ counter, answerQuestion, quizQuestions }) {
  const classes = useStylesQuiz();
  let quizContent = null;

  if (counter > quizQuestions.length) {
    quizContent = (
      <Fragment>
        <QuestionCount counter={counter} total={quizQuestions.length} />
        <Question content={quizQuestions[counter - 1].TEXT} />
        <Answers
          answerQuestion={answerQuestion}
          answers={quizQuestions[counter - 1].ANSWERs}
          response={quizQuestions[counter - 1].ID}
        />
      </Fragment>
    );
  } else {
    quizContent = <Results />;
  }
  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      {quizContent}
    </Container>
  );
}

Quiz.propTypes = {
  counter: PropTypes.number.isRequired,
  quizQuestions: PropTypes.array.isRequired,
  answerQuestion: PropTypes.func.isRequired
};

export default Quiz;
