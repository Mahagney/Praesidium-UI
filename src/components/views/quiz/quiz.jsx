//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesQuiz from './quiz-style';
import QuestionCount from './question-count';
import Question from './question';
import Answers from './answers';
import quizQuestions from './questions';
//#endregion

function Quiz() {
  const classes = useStylesQuiz();
  const [counter, setCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const answerQuestion = (correct) => {
    if (correct) setCorrectCount(correctCount + 1);
    if (counter == quizQuestions.length - 1) setCounter(0);
    else setCounter(counter + 1);
  };
  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      <QuestionCount counter={counter + 1} total={quizQuestions.length} />
      <Question content={quizQuestions[counter].content} />
      <Answers
        answerQuestion={answerQuestion}
        answers={quizQuestions[counter].answers}
        response={quizQuestions[counter].answer}
      />
    </Container>
  );
}

Quiz.propTypes = {};

export default Quiz;
