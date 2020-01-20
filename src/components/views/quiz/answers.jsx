//#region 'NPM DEP'
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

//#endregion

//#region 'LOCAL DEP'
import useStylesAnswer from './answers-style';
//#endregion

function Answers({answers, response, answerQuestion}) {
  const [currentResponse, setCurrentResponse] = useState(0);
  const classes = useStylesAnswer();


  const handleChange = ( event ) => {
    let res=false;
    if(event.target.value == response) 
      res=true; 
      console.log(response);
      setCurrentResponse(event.target.value);
      setTimeout(function(){
        answerQuestion(res);
        console.log(res);
        setCurrentResponse(0);
    }, 500);
      //answerQuestion(event.target.value == response);
    };

  function generateAnswerOption(answer){
    return (
        <FormControlLabel
        className={classes.formControlLabel}
        key={answer.value}
        value={answer.value}
        control={<Radio color="primary" />}
        label={answer.content}
        labelPlacement="end"
      />
    );
  }

  return (
    <Container component='div' maxWidth='md' style={{align: 'left', textAlign: 'left'}}>
        <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="gender" name="gender2" value={currentResponse} onChange={(event)=>handleChange(event)}>
          {answers.map(current => generateAnswerOption(current))}
        </RadioGroup>
      </FormControl>
    </Container>
  );
}

Answers.propTypes = {};

export default Answers;