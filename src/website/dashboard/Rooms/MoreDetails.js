import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL, ROOMS } from "../../../Api/api";
import Cookie from "cookie-universal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";

const MoreDetails = () => {
  const [room, setRoom] = useState("");
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const cookie = Cookie();

  const id = Number(window.location.pathname.split("/")[(0, 2)]);

  const showPic = images.map((img, index) => (
    <img
      key={index}
      width={"250px"}
      height={"200px"}
      className="m-3"
      src={img.path}
      alt={index}
    ></img>
  ));

  async function getRoom() {
    try {
      await axios
        .get(`${BASEURL}/${ROOMS}/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        })
        .then((data) => {
          setRoom(data.data.data);
          setCity(data.data.data.city);
          setImages(data.data.data.images);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <div className="bg-dark min-vh-100 w-100">
      <div className="container moreDetails text-info p-5">
        {room.length === "0" ? (
          <Loading />
        ) : (
          <>
            <h2>
              Title Room:<span className="text-white">{room.title}</span>
              <span>
                ID-Room: <span className="text-success">{room.id}</span>
              </span>
            </h2>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              {showPic}
            </div>
            <div>
              <p>
                Description:
                <span className="text-white">{room.description}</span>
              </p>
              <span className="error text-uppercase">
                price_per_day: {room.price_per_day}$
              </span>
              <p>
                number_of_beds:
                <span className="text-white">{room.number_of_beds}</span>
              </p>
              <p>
                City_Name:<span className="text-white">{city.name}</span>
              </p>
              <p>
                location:<span className="text-white">{room.location}</span>
              </p>
              <Link to="/">
                <Button>Back to home </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoreDetails;
