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

function Quiz({ counter, answerQuestion, quizQuestions }) {
  const classes = useStylesQuiz();
  let resultId = 0;
  quizQuestions[counter - 1].ANSWERs.forEach((element) => {
    if (element.IS_CORRECT) resultId = element.ID;
  });

  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      <QuestionCount counter={counter} total={quizQuestions.length} />
      <Question content={quizQuestions[counter - 1].TEXT} />
      <Answers
        answerQuestion={answerQuestion}
        answers={quizQuestions[counter - 1].ANSWERs}
        response={resultId}
      />
    </Container>
  );
}

Quiz.propTypes = {
  counter: PropTypes.number.isRequired,
  quizQuestions: PropTypes.array.isRequired,
  answerQuestion: PropTypes.func.isRequired
};

export default Quiz;
