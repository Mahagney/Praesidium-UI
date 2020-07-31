//#region 'NPM DEP'
import React from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons';
//#endregion

function EmployeeTypes({ assignCourse, employeeTypes, addEmployeeType, deleteEmployeeType }) {
  const columns = [
    { title: 'Denumire', field: 'NAME' },
    { title: 'Cod', field: 'CODE' },
    { title: 'Ultima Trimitere', field: 'LAST_SENT', editable: 'never' },
  ];

  return (
    <MaterialTable
      localization={{
        header: {
          actions: '',
        },
        toolbar: {
          searchTooltip: 'Cauta',
          searchPlaceholder: 'Cauta',
        },
        body: {
          addTooltip: 'Adauga',
          deleteTooltip: 'Sterge',
        },
        pagination: {
          labelRowsSelect: 'randuri',
        },
      }}
      icons={tableIcons}
      title="Asigneaza curs la tipul de angajat"
      columns={columns}
      data={employeeTypes}
      actions={[
        (rowData) => ({
          icon: tableIcons.Unchecked,
          tooltip: 'Retrimite',
          onClick: (event, currentRowData) => {
            assignCourse(currentRowData.ID);
          },
          hidden: !rowData.LAST_SENT,
        }),
        (rowData) => ({
          icon: tableIcons.Checked,
          tooltip: 'Trimite',
          onClick: (event, currentRowData) => {
            assignCourse(currentRowData.ID);
          },
          hidden: rowData.LAST_SENT,
        }),
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              addEmployeeType(newData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteEmployeeType(oldData.ID);
            }, 600);
          }),
      }}
    />
  );
}

EmployeeTypes.propTypes = {
  employeeTypes: propTypes.array.isRequired,
  addEmployeeType: propTypes.func.isRequired,
  deleteEmployeeType: propTypes.func.isRequired,
  assignCourse: propTypes.func.isRequired,
};

export default EmployeeTypes;
