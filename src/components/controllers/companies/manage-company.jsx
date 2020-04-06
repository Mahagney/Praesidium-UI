//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import Companies from './../../views/companies/index';
import { getCompanies, addCompany } from './../../../api/company-api';
//#endregion

function ManageCompany({ history, courses, loggedUser, loadCourses }) {
  useEffect(() => {
    if (!companies.length) {
      getCompanies().then(result => setCompanies(result));
    }
  }, []);

  const [companies, setCompanies] = useState([]);

  const appendCompany = (company) => {
    addCompany(company).then(response => {
      if (response.status == 200) {
        const newCompany = response.data;
        setCompanies([...companies, newCompany]);
      }
    })
  }


  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Companies companies={companies} addCompany={appendCompany} />
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
  };
}

const mapDispatchToProps = {
  //loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCompany);
