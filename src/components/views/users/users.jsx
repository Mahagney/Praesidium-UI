//#region 'NPM DEP'
import React, {useState} from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import * as EmailValidator from 'email-validator';
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
    { title: 'Nume', field: 'LAST_NAME', editComponent: (props) => generateTextField("Nume", "text", props, "name") },
    { title: 'Prenume', field: 'FIRST_NAME', editComponent: (props) => generateTextField("Prenume", "text", props, "name") },
    { title: 'Email', field: 'EMAIL', editComponent: (props) => generateTextField("Email", "email", props, "email")},
    { title: 'CNP', field: 'CNP', editComponent: (props) => generateTextField("CNP", "number", props, 'CNP') },
    { title: 'Tip Angajat', field: 'employeeTypes[0].CODE',
      editComponent: (props) =>{
        return generateEmployeeTypeField(employeeTypes, props.rowData?props.rowData.employeeTypes:selectedEmployeeType)
      }
    },
    { title: 'Firma', field: 'COMPANY.NAME',
    editComponent: (props) =>{
      return generateCompanyField(companiesList, props.rowData?props.rowData.COMPANY:null)
    }
    },
  ];

  let selectedCompany = null;
  let selectedEmployeeType = null;

  const validateData = (user, selectedCompany, selectedEmployeeType, idAddAction) =>{
    if(idAddAction && (!selectedCompany || !selectedEmployeeType))
      return false
    if(!user.FIRST_NAME || validate["name"](user.FIRST_NAME))
      return false
    if(!user.LAST_NAME || validate["name"](user.LAST_NAME))
      return false
    if(!user.EMAIL || validate["email"](user.EMAIL))
      return false
    if(!user.CNP || validate["CNP"](user.CNP))
      return false

    return true
  }

  const validate = {
    name: s => (s.length > 3 ? false : true),
    email: s => ((!s || !EmailValidator.validate(s)) ? true : false),
    CNP: s => (s.length != 13 ? true : false)
  };

  const generateTextField = (label, type, props, field) => {
    const [error, setError] = useState(false);

    return <TextField 
            type={type}
            error={error}
            //helperText={error}
            label={label}
            onChange={(e) => {
                //setErrorForField(field, false);
                if(field)
                  setError(validate[field](e.target.value))
                props.onChange(e.target.value);
            }}
            value={props.value === undefined ? '' : props.value}
        />
}

  const generateCompanyField = ( companies, initialCompany ) => {
    const [error, setError] = useState(false);

    if(initialCompany)
      initialCompany = {ID: initialCompany.ID, NAME: initialCompany.NAME}
    return <Autocomplete
        id="autocompleteCompany"
        disableClearable={true}
        onChange={(event, newValue) => {
          newValue?setError(false):setError(true)
          selectedCompany=newValue;
         }}
        options={companies}
        getOptionLabel={(option) => {
          return option.NAME
        }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        defaultValue={initialCompany}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Firma" error={error}/>}
      />
  }

  const generateEmployeeTypeField = ( employeeTypes, initialEmployeeType ) => {
    const [error, setError] = useState(false);

    let initialValue = null;
    if(initialEmployeeType && initialEmployeeType[0]){
      initialValue = initialEmployeeType[0]
      initialValue = { "ID":  initialValue.ID, "CODE": initialValue.CODE }
    }

    return <Autocomplete
        id="autocompleteEmployeeType"
        disableClearable={true}
        onChange={(event, newValue) => {
          newValue?setError(false):setError(true)
          selectedEmployeeType = newValue;
         }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        options={employeeTypes}
        getOptionLabel={(option) => {
          return option.CODE
        }}
        defaultValue={initialValue}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Tip Angajat" error={error}/>}
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
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  if(!validateData(newData, selectedCompany, selectedEmployeeType, true)){
                    reject()
                    return
                  }
                  resolve();
                  addUser(newData, selectedCompany, selectedEmployeeType);
                }, 600);
            }),
        onRowUpdate: (newData /*, oldData*/) =>{
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if(!validateData(newData)){
                reject()
                return
              }
              newData.ID_COMPANY = selectedCompany?selectedCompany.ID:newData.ID_COMPANY;
              newData.COMPANY = selectedCompany?selectedCompany:newData.COMPANY;
              updateUser(newData, selectedEmployeeType);
              resolve()
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
