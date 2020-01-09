import React from 'react';
import PropTypes from 'prop-types';

import useStylesQuestionCount from './question-count-style';

function QuestionCount(props) {
    const classes = useStylesQuestionCount();
    return (
        <div className={classes.questionCount}>
            Question <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default QuestionCount;