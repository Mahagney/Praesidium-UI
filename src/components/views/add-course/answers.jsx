import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/AddCircle';
import useStylesAnswers from './answers-style';

function Answers() {
  const classes = useStylesAnswers();

  return (
    <Container style={{ marginTop: '8px' }}>
      <h3 style={{ textAlign: 'left' }}>Answers</h3>
      <div className={classes.answerDiv}>
        <TextField
          //variant='outlined'
          margin='normal'
          fullWidth
          label='Question text'
          name='title'
          autoFocus
          //value={emailValue || ''}
          //onChange={onChange}
          //error={errors.email ? true : false}
          //helperText={errors.email}
        />
        <IconButton aria-label='Delete'>
          <DeleteIcon fontSize='medium' color='primary' />
        </IconButton>{' '}
      </div>
    </Container>
  );
}

Answers.propTypes = {};

export default Answers;
