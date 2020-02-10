//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
//#endregion

//#region 'LOCAL DEP'
import useStylesQuiz from './quiz-style';
import useStylesCourseEnd from './courseEnd-style';
//#endregion

function CourseEnd({ sendResponse }) {
  const classes = { ...useStylesQuiz(), ...useStylesCourseEnd() };
  const [accept, setAccept] = useState(false);

  return (
    <Container component='div' maxWidth='md' className={classes.quizContainer}>
      <h1 className={classes.title}>{'Incheierea cursului'}</h1>
      <div className={classes.formDiv}>
        <FormControlLabel
          control={
            <Checkbox
              checked={accept}
              onChange={() => setAccept(!accept)}
              value='checkedA'
              color='primary'
            />
          }
          label='Am citit documentul pdf si mi-am insusit informatiile din interiorul acestuia!'
        />
        <Button
          variant='contained'
          color='primary'
          disabled={accept ? false : true}
          onClick={() => {
            sendResponse();
          }}
        >
          Trimite
        </Button>
      </div>
    </Container>
  );
}

CourseEnd.propTypes = {
  sendResponse: PropTypes.func.isRequired
};

export default CourseEnd;
