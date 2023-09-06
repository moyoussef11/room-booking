import axios from "axios";
import React from "react";
import { BASEURL, LOGOUT } from "../../Api/api";
import Cookie from "cookie-universal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();
  const cookie = Cookie();

  async function LogOut() {
    try {
       await axios.post(`${BASEURL}/${LOGOUT}`, null, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + cookie.get("BookRooms"),
        },
      });
      cookie.remove("BookRooms");
      nav("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
      <Button variant="danger" style={{width:'fit-content'}} onClick={LogOut}>
        LogOut
      </Button>
  );
};

export default Logout;
