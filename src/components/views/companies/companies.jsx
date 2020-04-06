//#region 'NPM DEP'
import React, { forwardRef } from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
//#endregion

function Companies({ companies, addCompany }) {

    const columns = [
        { title: 'Name', field: 'NAME' },
        { title: 'CUI', field: 'CUI' },
        { title: 'Email', field: 'EMAIL' },
        {
            title: 'Phone Number',
            field: 'PHONE_NUMBER'
        },
        { title: 'Domain', field: 'DOMAIN' }
    ]
    return (
        <MaterialTable
            icons={tableIcons}
            title="Editable Example"
            columns={columns}
            data={companies}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            addCompany(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            // if (oldData) {
                            //     setState((prevState) => {
                            //         const data = [...prevState.data];
                            //         data[data.indexOf(oldData)] = newData;
                            //         return { ...prevState, data };
                            //     });
                            // }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            // setState((prevState) => {
                            //     const data = [...prevState.data];
                            //     data.splice(data.indexOf(oldData), 1);
                            //     return { ...prevState, data };
                            // });
                        }, 600);
                    }),
            }}
        />
    );
}

Companies.propTypes = {};

export default Companies;