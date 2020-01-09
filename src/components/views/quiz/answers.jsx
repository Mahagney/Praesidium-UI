//#region 'NPM DEP'
import React from 'react';
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

function Answers() {
  const classes = useStylesAnswer();
  const value=2;
  const handleChange = () => 3;
  return (
    <Container component='div' maxWidth='md' style={{align: 'left', textAlign: 'left'}}>
        <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="gender" name="gender2" value={value} onChange={handleChange}>
          <FormControlLabel
            className={classes.formControlLabel}
            value="female"
            control={<Radio color="primary" />}
            label="Female"
            labelPlacement="end"
          />
          <FormControlLabel
                      className={classes.formControlLabel}
            value="male"
            control={<Radio color="primary" />}
            label="Male"
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value="other"
            control={<Radio color="primary" />}
            label="Other"
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}

Answers.propTypes = {};

export default Answers;