import React, { useContext } from "react";
import "./room.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loading from "../../../components/loading/Loading";
import { RoomContext } from "../../../Context/RoomsContext";
import { Link } from "react-router-dom";
const Rooms = () => {
  const Rooms = useContext(RoomContext);

  const showRooms = Rooms.map((room) => (
    <Card key={room.id} style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={room.images[0].path}
        alt={`Error server pic _${room.images[0].id}`}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{room.title}</Card.Title>
        <Card.Text>{room.description.slice(0, 100)}</Card.Text>
        <Card.Text className="text-danger">
          price_per_day:{room.price_per_day}$
        </Card.Text>
        <Link to={`moreDetails/${room.id}`}>
          <Button variant="primary">More Details</Button>
        </Link>
      </Card.Body>
    </Card>
  ));
  return (
    <div className="room">
      <div className="container pt-5 w-100">
        <h2 className="room-h text-capitalize">Find your next stay</h2>
        <p className="w-100 my-4 room-p">
          Search low prices on hotels, homes and much more...
        </p>
      </div>
      <div className="container d-flex justify-content-evenly flex-wrap gap-3 p-3 room-card">
        {Rooms.length === 0 ? <Loading /> : showRooms}
      </div>
    </div>
  );
};
export default Rooms;
