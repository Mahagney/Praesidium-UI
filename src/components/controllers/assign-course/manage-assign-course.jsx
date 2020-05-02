//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import EmployeeType from './../../views/employee-types/index';
import { getEmployeeTypesByCourseId, addEmployeeType, deleteEmployeeType } from './../../../api/employee-type-api';
//#endregion

function ManageAssignCourse({match}) {
    useEffect(() => {
        if (!employeeTypes.length) {
            getEmployeeTypesByCourseId(match.params.courseId).then(result => setEmployeeTypes(result));
        }
    }, []);

    const [employeeTypes, setEmployeeTypes] = useState([]);

    const appendEmployeeType = (employeeType) => {
        addEmployeeType(employeeType).then(response => {
            if (response.status == 200) {
                const newEmployeeType = response.data;
                setEmployeeTypes([...employeeTypes, newEmployeeType]);
            }
        })
    }

    const removeEmployeeType = (employeeTypeId) => {
        deleteEmployeeType(employeeTypeId).then(result => {
            if (result.status == 200) {
                const tempEmployeeTypes = employeeTypes.filter(employeeType => employeeType.ID !== employeeTypeId)
                setEmployeeTypes(tempEmployeeTypes);
            }
        });
    }

    return (
        <Container component="div" maxWidth="lg" style={{ marginTop: "30px" }}>
            {<EmployeeType employeeTypes={employeeTypes} addEmployeeType={appendEmployeeType} deleteEmployeeType={removeEmployeeType} />}
        </Container>
    );
}

export default ManageAssignCourse;
