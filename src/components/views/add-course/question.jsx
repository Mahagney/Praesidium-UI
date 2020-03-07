import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStylesCourse from './add-course-style';
import Answers from './answers';

function Question() {
  const classes = useStylesCourse();
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');

  const generateQuestion = (question, index) => {
    index++;
    return (
      <div key={index}>
        <h3 style={{ textAlign: 'left', marginTop: '0.8rem' }}>
          {index + '.' + question.TEXT}
        </h3>
        <Answers />
      </div>
    );
  };

  return (
    <div className={classes.smallContainer}>
      <h2>Quiz</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          //variant='outlined'
          margin='normal'
          fullWidth
          label='Question text'
          name='title'
          autoFocus
          value={questionText || ''}
          onChange={(event) => setQuestionText(event.target.value)}
          //error={errors.email ? true : false}
          //helperText={errors.email}
        />
        <IconButton
          aria-label='Add'
          onClick={() => {
            setQuestions([{ TEXT: questionText, ANSWERS: {} }, ...questions]);
            setQuestionText('');
          }}
        >
          <AddCircleIcon color='primary' />
        </IconButton>{' '}
      </div>
      {questions.map((question, index) => generateQuestion(question, index))}
    </div>
  );
}

Question.propTypes = {};

export default Question;
