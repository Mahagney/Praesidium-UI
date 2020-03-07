import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStylesAnswers from './answers-style';
import AnswersList from './answers-list';

function Answers() {
  const classes = useStylesAnswers();
  const [answers, setAnswers] = useState([]);
  const [questionText, setQuestionText] = useState('');

  const addAnswer = (value) => {
    setAnswers([...answers, value]);
    setQuestionText('');
  };

  return (
    <Container style={{ marginTop: '8px' }}>
      <div className={classes.answerDiv}>
        <TextField
          //variant='outlined'
          margin='normal'
          fullWidth
          label='Answer text'
          name='answer'
          autoFocus
          value={questionText}
          onChange={(event) => setQuestionText(event.target.value)}
          //error={errors.email ? true : false}
          //helperText={errors.email}
        />
        <IconButton aria-label='Add' onClick={() => addAnswer(questionText)}>
          <AddCircleIcon color='primary' />
        </IconButton>{' '}
      </div>
      <AnswersList answers={answers} />
    </Container>
  );
}

Answers.propTypes = {};

export default Answers;
