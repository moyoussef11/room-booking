import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { BASEURL, CITIES } from "../../../Api/api";

const UpdateCity = () => {
  const [name, setName] = useState("");
    const [error, setError] = useState(false);
  const nav = useNavigate();
  const cookie = Cookie();
  const id = Number(window.location.pathname.split("/").slice(-1));
  useEffect(() => {
    axios
      .get(`${BASEURL}/${CITIES}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      })
      .then((data) => setName(data.data.data.name));
  }, []);
  async function submit(e) {
    e.preventDefault();
    try {
       await axios.put(
        `${BASEURL}/${CITIES}/${id}`,
        {
          name: name,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        }
      );
      nav("/dashboard/showCities");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <Form onSubmit={submit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      {error && (
        <p className="error">
          You can not update because you are a user and not an admin
        </p>
      )}
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateCity;
