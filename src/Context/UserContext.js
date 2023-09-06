import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { AUTH, BASEURL, USERS } from "../Api/api";
import Cookie from "cookie-universal";
import axios from "axios";

export const userContext = createContext();

const UserProviders = (props) => {
  const [user, setUser] = useState("");

  const cookie = Cookie();

  async function getUser() {
    try {
       await axios
        .get(`${BASEURL}/${USERS}/${AUTH}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + cookie.get("BookRooms"),
          },
        })
        .then((data) => setUser(data.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
};

export default UserProviders;
