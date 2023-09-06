import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { BASEURL, ROOMS } from "../Api/api";

export const RoomContext = createContext();

const RoomsContext = (props) => {
  const [rooms, setRooms] = useState([]);

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

  return (
    <RoomContext.Provider value={rooms}>{props.children}</RoomContext.Provider>
  );
};

export default RoomsContext;
