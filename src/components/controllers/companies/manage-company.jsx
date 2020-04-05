//#region 'NPM DEP'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import Companies from './../../views/companies/index';
//#endregion

function ManageCompany({ history, courses, loggedUser, loadCourses }) {
  useEffect(() => {
    if (!courses.length) {
      //loadCourses(loggedUser).catch(() => { });
    }
  }, []);
  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Companies />
    </Container>
  );
}

ManageCompany.propTypes = {
  // history: PropTypes.object.isRequired,
  // courses: PropTypes.array.isRequired,
  // loggedUser: PropTypes.object.isRequired,
  // loadCourses: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    courses: state.courses
  };
}

const mapDispatchToProps = {
  //loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompany);
