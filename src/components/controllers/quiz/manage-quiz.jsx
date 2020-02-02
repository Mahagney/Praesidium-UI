//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//#endregion

//#region 'LOCAL DEP'
import Quiz from '../../views/quiz';
import Results from '../../views/quiz/results';
//#endregion

function ManageQuiz({ quizData }) {
  const [counter, setCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const answerQuestion = (correct) => {
    if (correct) setCorrectCount(correctCount + 1);
    if (counter == quizData.length) setCounter(0);
    else setCounter(counter + 1);
  };

  const retryQuiz = () => {
    setCounter(0);
    setCorrectCount(0);
  };
  let quizContent;

  if (counter < quizData.length) {
    quizContent = (
      <Quiz
        counter={counter + 1}
        answerQuestion={answerQuestion}
        answers={quizData[counter].answers}
        response={quizData[counter].answer}
        quizQuestions={quizData}
      />
    );
  } else {
    const quizResult = (correctCount / quizData.length) * 100;
    quizContent = <Results retryQuiz={retryQuiz} results={quizResult} />;
  }

  return quizContent;
}

Quiz.propTypes = {
  quizData: PropTypes.object.isRequired
};

export default ManageQuiz;
