import React from 'react';
import PropTypes from 'prop-types';

import useStylesQuestionCount from './question-count-style';

function QuestionCount({ total, counter }) {
  const classes = useStylesQuestionCount();
  return (
    <div className={classes.questionCount}>
      Intrebarea <span>{counter}</span> din <span>{total}</span>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
