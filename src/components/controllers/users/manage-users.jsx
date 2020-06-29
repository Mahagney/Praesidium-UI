//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import { getUsers, deleteUser, updateUser, createUser } from './../../../api/user-api';
import { getCompanies } from './../../../api/company-api';
import { getEmployeeTypes } from './../../../api/employee-type-api';
import Users from './../../views/users';
//#endregion

function ManageUsers() {
  useEffect(() => {
    if (!users.length) {
      getUsers().then(result => setUsers(result));
    }
    if (!companies.length) {
      getCompanies().then(result =>{
        const newCompaniesList = result.map(currentCompany => ({"ID": currentCompany.ID, "NAME": currentCompany.NAME}))
        setCompanies(newCompaniesList);
      })
    }
    if (!employeeTypes.length) {
      getEmployeeTypes().then(result => setEmployeeTypes(
        result.map(current => {return {"ID": current.ID , "CODE": current.CODE}} )));
    }
  }, []);

  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const removeUser = (userId) => {
    deleteUser(userId).then(result => {
      if (result.status == 200) {
        const tempUsers = users.filter(user => user.ID !== userId)
        setUsers(tempUsers);
      }
    });
  }

  const editUser = (user) => {
    updateUser(user).then(result => {
      if (result.status == 200) {
        const newUser = users.map(currentUser => currentUser.ID == user.ID ? user : currentUser);
        setUsers(newUser);
      }
    });
  }

  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Users 
        users={users} 
        deleteUser={removeUser} 
        updateUser={editUser} 
        companiesList={companies} 
        employeeTypes={employeeTypes}
        createUser={createUser}/>
    </Container>
  );
}

export default ManageUsers;
