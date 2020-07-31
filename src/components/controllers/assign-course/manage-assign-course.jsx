//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import propTypes from 'prop-types';
//#endregion

//#region 'LOCAL DEP'
import EmployeeType from '../../views/employee-types/index';
import {
  getEmployeeTypesByCourseId,
  addEmployeeType,
  deleteEmployeeType,
  assignCourseByEmployeeType,
} from '../../../api/employee-type-api';
//#endregion

function ManageAssignCourse({ match }) {
  useEffect(() => {
    if (!employeeTypes.length) {
      fetchEmployeeTypes();
    }
  }, []);

  const fetchEmployeeTypes = () =>
    getEmployeeTypesByCourseId(match.params.courseId).then((result) => {
      const res = result.map((currentEmployeeType) =>
        currentEmployeeType.LAST_SENT
          ? { ...currentEmployeeType, LAST_SENT: currentEmployeeType.LAST_SENT.replace(/T/, ' ').replace(/\..+/, '') }
          : currentEmployeeType,
      );
      setEmployeeTypes(res);
    });

  const [employeeTypes, setEmployeeTypes] = useState([]);

  const appendEmployeeType = (employeeType) => {
    addEmployeeType(employeeType).then((response) => {
      if (response.status == 200) {
        const newEmployeeType = response.data;
        setEmployeeTypes([...employeeTypes, newEmployeeType]);
      }
    });
  };

  const removeEmployeeType = (employeeTypeId) => {
    deleteEmployeeType(employeeTypeId).then((result) => {
      if (result.status == 200) {
        const tempEmployeeTypes = employeeTypes.filter((employeeType) => employeeType.ID !== employeeTypeId);
        setEmployeeTypes(tempEmployeeTypes);
      }
    });
  };

  return (
    <Container component="div" maxWidth="lg" style={{ marginTop: '30px' }}>
      {
        <EmployeeType
          assignCourse={(employeeTypeId) => {
            assignCourseByEmployeeType(match.params.courseId, employeeTypeId).then(fetchEmployeeTypes);
          }}
          employeeTypes={employeeTypes}
          addEmployeeType={appendEmployeeType}
          deleteEmployeeType={removeEmployeeType}
        />
      }
    </Container>
  );
}

ManageAssignCourse.propTypes = {
  match: propTypes.object.isRequired,
};

export default ManageAssignCourse;
