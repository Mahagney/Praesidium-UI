//#region 'NPM DEP'
import React, {useState} from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import * as EmailValidator from 'email-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
import * as constants from './constants'
//#endregion

function Companies({ companies, addCompany, deleteCompany, updateCompany }) {

    const validate = {
        [constants.NAME]: s => ((!s||s.length < 3) ? true : false),
        [constants.EMAIL]: s => ((!s || !EmailValidator.validate(s)) ? true : false),
        [constants.CUI]: s => ((!s||s.length <8) ? true : false),
        [constants.PHONE_NUMBER]: (number) => {
            let phoneNumber = null;
            if(number)
                phoneNumber=parsePhoneNumberFromString(number, 'RO');
            
            if(!phoneNumber || !phoneNumber.isValid() ){
               return true;
            }
            return false
        },
        [constants.DOMAIN]: s => ((!s||s.length <2) ? true : false),
      };

    const generateTextField = (label, type, props, field) => {
        const [error, setError] = useState(false)

        return <TextField 
                type={type}
                error={error}
                label={label}
                onChange={(e) => {
                    if(field)
                        setError(validate[field](e.target.value))
                    props.onChange(e.target.value);
                }}
                value={props.value === undefined ? '' : props.value}
            />
    }

    const actionFunction = (callback, newData) => new Promise((resolve,reject) => {
        setTimeout(() => {
            if(validate[constants.NAME](newData[constants.NAME])
                || validate[constants.PHONE_NUMBER](newData[constants.PHONE_NUMBER])
                || validate[constants.EMAIL](newData[constants.EMAIL])
                || validate[constants.CUI](newData[constants.CUI])
                || validate[constants.DOMAIN](newData[constants.DOMAIN])) {

                reject()
                return
            }                    

            const phoneNumber=parsePhoneNumberFromString(newData[constants.PHONE_NUMBER], 'RO');
            newData[constants.PHONE_NUMBER] = phoneNumber.formatInternational();

            resolve();
            callback(newData);
        }, 600);
    })

    const columns = [
        { title: 'Name', field: constants.NAME,
        editComponent: (props) => generateTextField("Name", "Name",props, constants.NAME)},
        { title: 'CUI', field: constants.CUI,
        editComponent: (props) => generateTextField("CUI", "",props,constants.CUI)},
        { title: 'Email', field: constants.EMAIL,
        editComponent: (props) => generateTextField("Email", "email",props,constants.EMAIL)},
        {
            title: 'Phone Number',
            field: constants.PHONE_NUMBER,
            editComponent: (props) => generateTextField("Phone Number", "tel",props,constants.PHONE_NUMBER)
        },
        { 
            title: 'Domain', 
            field: constants.DOMAIN,            
            editComponent: (props) => generateTextField("Domain", "",props,constants.DOMAIN)
        }
    ]

    return (
        <MaterialTable
            icons={tableIcons}
            title="Vizualizare firme"
            columns={columns}
            data={companies}
            editable={{
                onRowAdd: (newData) => actionFunction(addCompany, newData),
                onRowUpdate: (newData/*, oldData*/) =>  actionFunction(updateCompany, newData, true),
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