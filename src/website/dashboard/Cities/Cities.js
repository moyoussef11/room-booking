import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { BASEURL, CITIES } from '../../../Api/api';
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

const Cities = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
      const nav = useNavigate();
      const cookie = Cookie();
  // submit
  async function submit(e) {
    e.preventDefault();
    try {
         await axios.post(`${BASEURL}/${CITIES}`, {
            name: name,
        }, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      });
      nav("/dashboard/showCities");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Handle specific error response status code 422
        console.log("Validation error:", err.response.data);
      } else {
        setError(true)
        // Handle other types of errors
        console.log("An error occurred:", err);
      }
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
          You can not add because you are a user and not an admin
        </p>
      )}
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default Cities;