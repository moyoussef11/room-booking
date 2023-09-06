import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BASEURL, CITIES } from "../../../Api/api";
import Cookie from "cookie-universal";
import { Link } from "react-router-dom";
import { userContext } from "../../../Context/UserContext";

const ShowCities = () => {
  // states
  const [cities, setCities] = useState([]);

  const user = useContext(userContext);
  const role = user.role;


  const cookie = Cookie();
  // ShowCities
  const showCities = cities.map((city, index) => (
    <tr key={city.id}>
      <td>{index + 1}</td>
      <td>{city.id}</td>
      <td>{city.name}</td>
      {role === "admin" ? (
        <td>
          <Link to={`${city.id}`}>
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
            onClick={() => handleDelete(city.id)}
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

  // handle Delete
  function handleDelete(id) {
    axios
      .delete(`${BASEURL}/${CITIES}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      })
      .then(() => getCities());
  }

  // getCities
  async function getCities() {
    try {
      await axios
        .get(`${BASEURL}/${CITIES}`,{
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        })
        .then((data) => setCities(data.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>#</th>
          <th>City-ID</th>
          <th>City Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{showCities}</tbody>
    </Table>
  );
};

export default ShowCities;
