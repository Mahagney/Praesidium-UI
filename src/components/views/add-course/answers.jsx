import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStylesAnswers from './answers-style';
import AnswersList from './answers-list';

function Answers({ answers, setAnswers, error }) {
  const classes = useStylesAnswers();
  const [answerText, setAnswerText] = useState('');

  const addAnswer = (value) => {
    if (value) {
      setAnswers([...answers, { TEXT: value, IS_CORRECT: false }]);
      setAnswerText('');
    }
  };

  const selectCorrectAnswer = (index) => {
    setAnswers(
      answers.map((v, i) => (i != index ? { TEXT: v.TEXT, IS_CORRECT: false } : { TEXT: v.TEXT, IS_CORRECT: true })),
    );
  };

  return (
    <Container style={{ marginTop: '8px' }}>
      <div className={classes.answerDiv}>
        <TextField
          //variant='outlined'
          margin="normal"
          fullWidth
          label="Text Raspuns"
          name="answer"
          autoFocus
          value={answerText}
          onChange={(event) => setAnswerText(event.target.value)}
          error={!!error}
          helperText={error}
        />
        <IconButton aria-label="Add" onClick={() => addAnswer(answerText)}>
          <AddCircleIcon color="primary" />
        </IconButton>{' '}
      </div>
      <AnswersList answers={answers} selectCorrectAnswer={selectCorrectAnswer} />
    </Container>
  );
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  setAnswers: PropTypes.func.isRequired,
};

export default Answers;
