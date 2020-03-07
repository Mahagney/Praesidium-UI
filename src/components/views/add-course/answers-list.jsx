//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

//#endregion

//#region 'LOCAL DEP'
import useStylesAnswer from './answers-style';
//#endregion

function Answers({ answers, selectCorrectAnswer }) {
  const [currentResponse, setCurrentResponse] = useState(0);
  const classes = useStylesAnswer();

  const handleChange = (event) => {
    setCurrentResponse(parseInt(event.target.value));
    //selectCorrectAnswer(event.target.value);
  };

  function generateAnswerOption(answer) {
    return (
      <FormControlLabel
        className={classes.formControlLabel}
        key={answer.ID}
        value={answer.ID}
        control={<Radio color='primary' />}
        label={answer.TEXT}
        labelPlacement='end'
      />
    );
  }

  return (
    <Container
      component='div'
      maxWidth='md'
      style={{ align: 'left', textAlign: 'left' }}
    >
      <FormControl component='fieldset' className={classes.formControl}>
        <RadioGroup
          aria-label='gender'
          name='gender2'
          value={currentResponse}
          onChange={(event) => handleChange(event)}
        >
          {answers.map((current, index) =>
            generateAnswerOption({ ID: index, TEXT: current })
          )}
        </RadioGroup>
      </FormControl>
    </Container>
  );
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired
  //selectCorrectAnswer: PropTypes.func.isRequired
};

export default Answers;
