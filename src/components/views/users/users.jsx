//#region 'NPM DEP'
import React from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
//#endregion

function Users({ users }) {

    const columns = [
        { title: 'Nume', field: 'LAST_NAME' },
        { title: 'Prenume', field: 'FIRST_NAME' },
        { title: 'Email', field: 'EMAIL' },
        { title: 'CNP', field: 'CNP' }
    ]

    return (
        <MaterialTable
            icons={tableIcons}
            title="Vizualizare angajati"
            columns={columns}
            data={users}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            //addCompany(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData/*, oldData*/) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            //updateUser(newData);
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            //deleteCompany(oldData.ID);
                        }, 600);
                    }),
            }}
        />
    );
}

Users.propTypes = {
    users: propTypes.array.isRequired
};

export default Users;