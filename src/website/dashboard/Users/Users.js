import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BASEURL, USERS } from "../../../Api/api";
import axios from "axios";
import Cookie from "cookie-universal";
const Users = () => {
  const [users, setUsers] = useState([]);
  const cookie = Cookie();
  



  const showUsers = users.map((user, index) => (
    <tr key={user.id}>
      <td>{index + 1}</td>
      <td>{user.name}k</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </tr>
  ));


  
  async function getUsers() {
    try {
       await axios
        .get(`${BASEURL}/${USERS}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        })
        .then((data) => setUsers(data.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>{showUsers}</tbody>
    </Table>
  );
};

export default Users;
