//#region 'NPM DEP'
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import { getUsers } from './../../../api/user-api';
import Users from './../../views/users';
//#endregion

function ManageUsers() {
  useEffect(() => {
    if (!users.length) {
      getUsers().then(result => setUsers(result));
    }
  }, []);

  const [users, setUsers] = useState([]);

  return (
    <Container component="div" maxWidth="xl" style={{ marginTop: "30px" }}>
      <Users users={users} />
    </Container>
  );
}

export default ManageUsers;
