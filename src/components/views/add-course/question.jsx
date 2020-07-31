import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import useStylesCourse from './add-course-style';
import Answers from './answers';

function Question({ questions, setQuestions, questionErrors }) {
  const classes = useStylesCourse();
  const [questionText, setQuestionText] = useState('');

  const removeQuestion = (index) => {
    const tempQuestions = [...questions];
    tempQuestions.splice(index, 1);
    setQuestions(tempQuestions);
  };

  const generateQuestion = (question, index) => {
    return (
      <div key={index}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h3 style={{ textAlign: 'left', marginTop: '0.8rem' }}>{index + 1 + '.' + question.TEXT}</h3>
          <IconButton aria-label="Add" onClick={() => removeQuestion(index)}>
            <RemoveCircleIcon />
          </IconButton>{' '}
        </div>
        <Answers
          error={questionErrors[index]}
          answers={question.ANSWERS}
          setAnswers={(answers) => {
            setQuestions(
              questions.map((currentQuestion, currentIndex) =>
                currentIndex != index ? question : { ...currentQuestion, ANSWERS: answers },
              ),
            );
          }}
        />
      </div>
    );
  };

  return (
    <div className={classes.smallContainer}>
      <h2>Chestionar</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          //variant='outlined'
          margin="normal"
          fullWidth
          label="Text intrebare"
          name="title"
          autoFocus
          value={questionText || ''}
          onChange={(event) => setQuestionText(event.target.value)}
          //error={errors.email ? true : false}
          //helperText={errors.email}
        />
        <IconButton
          aria-label="Add"
          onClick={() => {
            if (questionText) {
              setQuestions([...questions, { TEXT: questionText, ANSWERS: [] }]);
              setQuestionText('');
            }
          }}
        >
          <AddCircleIcon color="primary" />
        </IconButton>{' '}
      </div>
      {questions.map((question, index) => generateQuestion(question, index))}
    </div>
  );
}

Question.propTypes = {
  questions: PropTypes.array.isRequired,
  questionErrors: PropTypes.object.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default Question;
