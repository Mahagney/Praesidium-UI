//#region 'NPM DEP'
import React, { useState } from 'react'
import propTypes from 'prop-types'
import MaterialTable from 'material-table'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import * as EmailValidator from 'email-validator'
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
import { localizationMaterialTable } from '../common'
//#endregion

function Users({
  users,
  deleteUser,
  updateUser,
  createUser,
  companiesList,
  employeeTypes,
}) {
  const addUser = (userData) => {
    userData.ID_COMPANY = userData.COMPANY.ID
    userData.ID_EMPLOYEE_TYPE = userData.employeeTypes[0].ID
    createUser(userData)
  }

  const columns = [
    {
      title: 'NUME',
      field: 'LAST_NAME',
      editComponent: (props) =>
        generateTextField('Nume', 'text', props, 'name'),
    },
    {
      title: 'PRENUME',
      field: 'FIRST_NAME',
      editComponent: (props) =>
        generateTextField('Prenume', 'text', props, 'name'),
    },
    {
      title: 'EMAIL',
      field: 'EMAIL',
      editComponent: (props) =>
        generateTextField('Email', 'email', props, 'email'),
    },
    {
      title: 'CNP',
      field: 'CNP',
      editComponent: (props) =>
        generateTextField('CNP', 'number', props, 'CNP'),
    },

    {
      title: 'TIP ANGAJAT',
      field: 'employeeTypes[0]',
      render: (rowData) => rowData.employeeTypes[0].CODE,
      editComponent: (props) => {
        const initialEmployeeType = props.value ? props.value : null
        return generateEmployeeTypeField(
          employeeTypes,
          initialEmployeeType,
          props
        )
      },
    },
    {
      title: 'FIRMA',
      field: 'COMPANY',
      render: (rowData) => rowData.COMPANY.NAME,
      editComponent: (props) => {
        const initialCompany = props.value
          ? companiesList.find(
              (currentCompany) => currentCompany.ID == props.value.ID
            )
          : null
        return generateCompanyField(companiesList, initialCompany, props)
      },
    },
  ]

  const validateData = (user) => {
    if (!user.employeeTypes || !user.employeeTypes[0]) return false
    if (!user.COMPANY) return false
    if (!user.FIRST_NAME || validate['name'](user.FIRST_NAME)) return false
    if (!user.LAST_NAME || validate['name'](user.LAST_NAME)) return false
    if (!user.EMAIL || validate['email'](user.EMAIL)) return false
    if (!user.CNP || validate['CNP'](user.CNP)) return false

    return true
  }

  const validate = {
    name: (s) => (s.length > 3 ? false : true),
    email: (s) => (!s || !EmailValidator.validate(s) ? true : false),
    CNP: (s) => (s.length != 13 ? true : false),
  }

  const generateTextField = (label, type, props, field) => {
    const [error, setError] = useState(false)

    return (
      <TextField
        type={type}
        error={error}
        //helperText={error}
        label={label}
        onChange={(e) => {
          //setErrorForField(field, false);
          if (field) setError(validate[field](e.target.value))
          props.onChange(e.target.value)
        }}
        value={props.value === undefined ? '' : props.value}
      />
    )
  }

  const generateCompanyField = (companies, initialCompany, props) => {
    const [error, setError] = useState(false)

    return (
      <Autocomplete
        id='autocompleteCompany'
        disableClearable={true}
        onChange={(event, newValue) => {
          props.onChange(newValue)
          newValue ? setError(false) : setError(true)
        }}
        options={companies}
        getOptionLabel={(option) => {
          return option.NAME
        }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        defaultValue={initialCompany}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='Firma' error={error} />
        )}
      />
    )
  }

  const generateEmployeeTypeField = (
    employeeTypes,
    initialEmployeeType,
    props
  ) => {
    const [error, setError] = useState(false)

    return (
      <Autocomplete
        id='autocompleteEmployeeType'
        disableClearable={true}
        onChange={(event, newValue) => {
          newValue.edited = true
          props.onChange(newValue)
          newValue ? setError(false) : setError(true)
        }}
        getOptionSelected={(option, value) => option.ID === value.ID}
        options={employeeTypes}
        getOptionLabel={(option) => {
          return option.CODE
        }}
        defaultValue={initialEmployeeType}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='Tip Angajat' error={error} />
        )}
      />
    )
  }

  return (
    <MaterialTable
      localization={localizationMaterialTable}
      icons={tableIcons}
      title='Vizualizare angajati'
      columns={columns}
      data={users}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (!validateData(newData, true)) {
                reject()
                return
              }
              resolve()
              addUser(newData)
            }, 600)
          }),
        onRowUpdate: (newData /*, oldData*/) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (!validateData(newData)) {
                reject()
                return
              }
              newData.ID_COMPANY = newData.COMPANY.ID
              const newEmployeeType = newData.employeeTypes[0].edited
                ? newData.employeeTypes[0]
                : null
              updateUser(newData, newEmployeeType)
              resolve()
            }, 600)
          })
        },
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
              deleteUser(oldData.ID)
            }, 600)
          }),
      }}
    />
  )
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
