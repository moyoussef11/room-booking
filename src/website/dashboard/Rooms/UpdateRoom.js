import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BASEURL, ROOMS } from "../../../Api/api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

const UpdateRoom = () => {
  const [activated, setActivated] = useState("");

  const nav = useNavigate();
  const cookie = Cookie();

  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    axios
      .get(`${BASEURL}/${ROOMS}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      })
      .then((data) => setActivated(data.data.data.activated));
  }, []);

  async function Submit(e) {
    e.preventDefault();
    try {
      let res = await axios.put(
        `${BASEURL}/${ROOMS}/${id}`,
        {
          activated: activated,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        }
      );
      nav("/DashBoard/RoomReservations");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form onSubmit={Submit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Activated</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={activated}
            onChange={(e) => setActivated(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateRoom;
