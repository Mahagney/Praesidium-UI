//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

//#region 'LOCAL DEP'
import Quiz from '../../views/quiz';
import quizQuestions from './questions';
//#endregion

function ManageQuiz() {
  const [counter, setCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const answerQuestion = (correct) => {
    if (correct) setCorrectCount(correctCount + 1);
    if (counter == quizQuestions.length - 1) setCounter(0);
    else setCounter(counter + 1);
  };

  return (
    <Quiz
      counter={counter + 1}
      answerQuestion={answerQuestion}
      answers={quizQuestions[counter].answers}
      response={quizQuestions[counter].answer}
      quizQuestions={quizQuestions}
    />
  );
}

Quiz.propTypes = {};

export default ManageQuiz;
