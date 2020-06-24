//#region 'NPM DEP'
import React, {useState} from 'react';
import propTypes from 'prop-types';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';
//#endregion

//#region 'LOCAL DEP'
import tableIcons from './icons'
import * as constants from './constants'
//#endregion

function Companies({ companies, addCompany, deleteCompany, updateCompany }) {

    const [inputErrors,setInputErrors] = useState(constants.INPUT_ERRORS);
    const setErrorForField = (fieldName, value) =>{
        if(value != inputErrors[fieldName]){
        const errors = {...inputErrors}
        errors[fieldName] = value
        setInputErrors(errors);}
    }

    const generateTextField = (label, type, props, field) => {
        return <TextField 
                type={type}
                error={inputErrors[field]}
                label={label}
                onChange={(e) => {
                    setErrorForField(field, false);
                    props.onChange(e.target.value);
                }}
                value={props.value === undefined ? '' : props.value}
            />
    }

    const actionFunction = (callback, newData) => new Promise((resolve,reject) => {
        setTimeout(() => {
            let ok = true;
            const errors = {...inputErrors}

            const onError = (fieldKey, callback) =>{
                if(!newData[fieldKey]){
                    errors[fieldKey]= true;
                    return false;
                }
                return ok;
            }

            if(!newData[constants.EMAIL] || !validator.isEmail(newData[constants.EMAIL])){
                errors[constants.EMAIL]= true;
                ok=false;
            }
            if(!newData[constants.PHONE_NUMBER] || !validator.isMobilePhone(newData[constants.PHONE_NUMBER])){
                errors[constants.PHONE_NUMBER]= true;
                ok=false;
            }

            ok = onError(constants.NAME);
            ok = onError(constants.CUI);
            ok = onError(constants.DOMAIN);

            setInputErrors(errors);

            if(ok){
                resolve();
                callback(newData);
                setInputErrors(constants.INPUT_ERRORS);
            }
            reject();
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
                onRowUpdate: (newData/*, oldData*/) =>  actionFunction(updateCompany, newData),
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