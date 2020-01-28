//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

//#region 'LOCAL DEP'
import Quiz from '../../views/quiz';
//#endregion

function ManageQuiz({ quizData }) {
  const [counter, setCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const answerQuestion = (correct) => {
    if (correct) setCorrectCount(correctCount + 1);
    if (counter == quizData.length - 1) setCounter(0);
    else setCounter(counter + 1);
  };

  return (
    <Quiz
      counter={counter + 1}
      answerQuestion={answerQuestion}
      answers={quizData[counter].answers}
      response={quizData[counter].answer}
      quizQuestions={quizData}
    />
  );
}

Quiz.propTypes = {};

export default ManageQuiz;
