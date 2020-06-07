//#region 'NPM DEP'
import React from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
//#endregion

function Companies({ companies, addCompany, deleteCompany, updateCompany }) {

    const columns = [
        { title: 'Name', field: 'NAME' },
        { title: 'CUI', field: 'CUI'  },
        { title: 'Email', field: 'EMAIL' },
        {
            title: 'Phone Number',
            field: 'PHONE_NUMBER',
            type: 'numeric'
        },
        { title: 'Domain', field: 'DOMAIN' }
    ]
    return (
        <MaterialTable
            icons={tableIcons}
            title="Vizualizare firme"
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
                onRowUpdate: (newData/*, oldData*/) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            updateCompany(newData);
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            deleteCompany(oldData.ID);
                        }, 600);
                    }),
            }}
        />
    );
}

Companies.propTypes = {
    companies: propTypes.array.isRequired,
    addCompany: propTypes.func.isRequired,
    deleteCompany: propTypes.func.isRequired,
    updateCompany: propTypes.func.isRequired
};

export default Companies;