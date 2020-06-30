//#region 'NPM DEP'
import React from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons';
//#endregion

function Users({ users, deleteUser, updateUser, createUser, companiesList, employeeTypes }) {

  const addUser = (userData, company, employeeType) =>{
    userData.ID_COMPANY = company.ID;
    userData.ID_EMPLOYEE_TYPE = employeeType.ID;
    createUser(userData);
  }

  const columns = [
    { title: 'Nume', field: 'LAST_NAME' },
    { title: 'Prenume', field: 'FIRST_NAME' },
    { title: 'Email', field: 'EMAIL' },
    { title: 'CNP', field: 'CNP' },
    { title: 'Tip Angajat', field: 'employeeTypes[0].CODE',
      editComponent: (props) =>{
        return generateEmployeeTypeField(employeeTypes, props.rowData?props.rowData.employeeTypes:selectedEmployeeType)
      }
    },
    { title: 'Firma', field: 'COMPANY.NAME',
    editComponent: (props) =>{
      return generateCompanyField(companiesList, props.rowData?props.rowData.COMPANY:selectedCompany)
    }
    },
  ];

  let selectedCompany = null;
  let selectedEmployeeType = null;

  const generateCompanyField = ( companies, initialCompany ) => {
    if(initialCompany)
      initialCompany = {ID: initialCompany.ID, NAME: initialCompany.NAME}
    return <Autocomplete
        id="autocompleteCompany"
        onChange={(event, newValue) => {
           selectedCompany=newValue;
         }}
        options={companies}
        getOptionLabel={(option) => {
          return option.NAME
        }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        defaultValue={initialCompany}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Firma" />}
      />
  }

  const generateEmployeeTypeField = ( employeeTypes, initialEmployeeType ) => {
    let initialValue = null;
    if(initialEmployeeType && initialEmployeeType[0]){
      initialValue = initialEmployeeType[0]
      initialValue = { "ID":  initialValue.ID, "CODE": initialValue.CODE }
    }

    return <Autocomplete
        id="autocompleteEmployeeType"
        onChange={(event, newValue) => {
          selectedEmployeeType = newValue;
         }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        options={employeeTypes}
        getOptionLabel={(option) => {
          return option.CODE
        }}
        defaultValue={initialValue}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Tip Angajat" />}
      />
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title='Vizualizare angajati'
      columns={columns}
      data={users}
      editable={{
        onRowAdd: (newData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    addUser(newData, selectedCompany, selectedEmployeeType);
                }, 600);
            }),
        onRowUpdate: (newData /*, oldData*/) =>{
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject();
              newData.ID_COMPANY = selectedCompany?selectedCompany.ID:newData.ID_COMPANY;
              newData.COMPANY = selectedCompany?selectedCompany:newData.COMPANY;
              updateUser(newData, selectedEmployeeType);
            }, 600);
          })},
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteUser(oldData.ID);
            }, 600);
          }),
      }}
    />
  );
}

Users.propTypes = {
  users: propTypes.array.isRequired,
  deleteUser: propTypes.func.isRequired,
  updateUser: propTypes.func.isRequired,
  createUser: propTypes.func.isRequired,
  companiesList: propTypes.array.isRequired,
  employeeTypes: propTypes.array.isRequired
};

export default Users;
