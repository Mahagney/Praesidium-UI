//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import Companies from './../../views/companies/index';
import { getCompanies, addCompany, deleteCompany, updateCompany } from './../../../api/company-api';
//#endregion

function ManageCompany() {
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

  const removeCompany = (companyId) => {
    deleteCompany(companyId).then(result => {
      if (result.status == 200) {
        const tempCompanies = companies.filter(comp => comp.ID !== companyId)
        setCompanies(tempCompanies);
      }
    });
  }

  const editCompany = (company) => {
    updateCompany(company).then(result => {
      if (result.status == 200) {
        const newCompanies = companies.map(comp => comp.ID == company.ID ? company : comp);
        setCompanies(newCompanies);
      }
    });
  }


  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Companies companies={companies} addCompany={appendCompany} deleteCompany={removeCompany} updateCompany={editCompany} />
    </Container>
  );
}

export default ManageCompany;
