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
    const [inputErrors,setInputErrors] = useState(constants.INPUT_ERRORS);
    //Commented until bug is fixed on mui table
    // const setErrorForField = (fieldName, value) =>{
    //     if(value != inputErrors[fieldName]){
    //         const errors = {...inputErrors}
    //         errors[fieldName] = value
    //         setInputErrors(errors);
    //     }
    // }

    const generateTextField = (label, type, props, field) => {
        return <TextField 
                type={type}
                error={inputErrors[field]}
                label={label}
                onChange={(e) => {
                    //setErrorForField(field, false);
                    props.onChange(e.target.value);
                }}
                value={props.value === undefined ? '' : props.value}
            />
    }

    const actionFunction = (callback, newData, isUpdate) => new Promise((resolve,reject) => {
        setTimeout(() => {
            let ok = true;
            let errors = {...constants.INPUT_ERRORS}

            const onError = (fieldKey) =>{
                if(!newData[fieldKey]){
                    errors[fieldKey]= true;
                    return false;
                }
                return ok;
            }

            if(!newData[constants.EMAIL] || !EmailValidator.validate(newData[constants.EMAIL])){
                errors[constants.EMAIL]= true;
                ok=false;
            }

            let phoneNumber = null;
            if(newData[constants.PHONE_NUMBER])
                phoneNumber=parsePhoneNumberFromString(newData[constants.PHONE_NUMBER], 'RO');
            
            if(!newData[constants.PHONE_NUMBER] || !phoneNumber || !phoneNumber.isValid() ){
                errors[constants.PHONE_NUMBER]= true;
                ok=false;
            }else{
                newData[constants.PHONE_NUMBER] = phoneNumber.formatInternational();
            }

            ok = onError(constants.NAME);
            ok = onError(constants.CUI);
            ok = onError(constants.DOMAIN);                        

            if(ok){
                resolve();
                callback(newData);
                errors = {...constants.INPUT_ERRORS};
            }
            else{
                reject();
            }

            if(!isUpdate){
                setInputErrors(errors);
            }
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
                onRowAddCancelled: () => setInputErrors(constants.INPUT_ERRORS),
                onRowUpdateCancelled: () => setInputErrors(constants.INPUT_ERRORS),
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