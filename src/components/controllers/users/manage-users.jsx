//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import { getUsers, deleteUser, updateUser } from './../../../api/user-api';
import Users from './../../views/users';
//#endregion

function ManageUsers() {
  useEffect(() => {
    if (!users.length) {
      getUsers().then(result => setUsers(result));
    }
  }, []);

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
  const [users, setUsers] = useState([]);

  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Users users={users} deleteUser={removeUser} updateUser={editUser} />
    </Container>
  );
}

export default ManageUsers;
