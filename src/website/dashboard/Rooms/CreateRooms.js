import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BASEURL, ROOMS } from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
const CreateRooms = () => {
  // states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city_id, setCityId] = useState("");
  const [location, setLocation] = useState("");
  const [price_per_day, setPricePerDay] = useState("");
  const [number_of_beds, setNumberOfBeds] = useState("");
  const [activated, setActivated] = useState("");
  const [images, setImage] = useState([]);

  const nav = useNavigate();
  const cookie = Cookie();
  // submit
  async function submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("city_id", city_id);
      formData.append("location", location);
      formData.append("price_per_day", price_per_day);
      formData.append("number_of_beds", number_of_beds);
      formData.append("activated", activated);
      formData.append("images", images);
      // Append each image separately

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.size <= 2048 * 1024) {
          formData.append(`images[${i}]`, image);
        } else {
          console.log(`Image ${i + 1} size exceeds the maximum limit`);
        }
      }

      await axios.post(`${BASEURL}/${ROOMS}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      });
      nav("/DashBoard/RoomReservations");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        // Handle specific error response status code 422
        console.log("Validation error:", err.response.data);
      } else {
        // Handle other types of errors
        console.log("An error occurred:", err);
      }
    }
  }
  return (
    <Form onSubmit={submit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label>price_per_day</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            name="price_per_day"
            value={price_per_day}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>location</Form.Label>
        <Form.Control
          placeholder="1234 Main St"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City-id</Form.Label>
          <Form.Control
            type="number"
            name="city_id"
            value={city_id}
            onChange={(e) => setCityId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Number_of_beds</Form.Label>
          <Form.Control
            type="number"
            name="number_of_beds"
            value={number_of_beds}
            onChange={(e) => setNumberOfBeds(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group controlId="formGridActivated">
        <Form.Label>Activated</Form.Label>
        <Form.Control
          type="number"
          name="activated"
          value={activated}
          onChange={(e) => setActivated(parseInt(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>images</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(Array.from(e.target.files))}
          required
          multiple
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateRooms;
