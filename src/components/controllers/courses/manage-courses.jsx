//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
//#endregion

//#region 'LOCAL DEP'
//#endregion

function ManageCourses({ history }) {
  return <p>Courses page</p>;
}

ManageCourses.propTypes = {
  history: PropTypes.object.isRequired
};

export default ManageCourses;
