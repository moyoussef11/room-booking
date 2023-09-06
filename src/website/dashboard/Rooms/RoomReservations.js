import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASEURL, ROOMS } from "../../../Api/api";
import Cookie from "cookie-universal";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";

const RoomReservations = () => {
  const [rooms, setRooms] = useState([]);
  const user = useContext(userContext);
  const role = user.role;
  const cookie = Cookie();
  async function getRooms() {
    try {
       axios
        .get(`${BASEURL}/${ROOMS}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        })
        .then((data) => setRooms(data.data.data));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRooms();
  }, []);
  function handleDelete(id) {
    axios
      .delete(`${BASEURL}/${ROOMS}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      })
      .then((data) => getRooms());
  }
  const showRooms = rooms.map((room, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{room.id}</td>
      <td>{room.title.slice(0, 20)}</td>
      <td>{room.city.id}</td>
      <td>{room.city.name}</td>
      <td>{room.location}</td>
      <td>{room.number_of_beds}</td>
      <td>{room.price_per_day}</td>
      {role === "admin" ? (
        <td className="d-flex align-items-center justify-content-evenly flex-wrap">
          <Link to={`${room.id}`}>
            <Button
              className="w-auto mx-2"
              style={{ backgroundColor: "green" }}
            >
              Update
            </Button>
          </Link>
          <Button
            className="w-auto"
            style={{ backgroundColor: "red" }}
            onClick={() => handleDelete(room.id)}
          >
            Delete
          </Button>
        </td>
      ) : (
        <td>
          <p className="error">you not admin</p>
        </td>
      )}
    </tr>
  ));
  return (
    <Table striped bordered hover variant="dark" className="text-center">
      <thead>
        <tr>
          <th>#</th>
          <th>Room-ID</th>
          <th>Title</th>
          <th>City-ID</th>
          <th>CityName</th>
          <th>Location</th>
          <th>number_of_beds</th>
          <th>price_per_day</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{showRooms}</tbody>
    </Table>
  );
};
export default RoomReservations;
