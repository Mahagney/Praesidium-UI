import React from 'react';
import PropTypes from 'prop-types';

import useStylesQuestion from "./question-style.js";

function Question(props) {
    const classes = useStylesQuestion();
    return (
        <h1 className={classes.question}>{props.content}</h1>
    );
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question;