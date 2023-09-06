import React, { useContext } from "react";
import "./layout.css";
import Logout from "../../website/auth/Logout";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { userContext } from "../../Context/UserContext";
const TopBar = () => {
  const user = useContext(userContext);
  return (
    <Navbar
      expand="lg"
      className="header d-flex justify-content-between align-items-center"
    >
      <Container>
        <Link className="navbar-brand logo" to="/">
          Booking
        </Link>

        <Dropdown>
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            User: {user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item >
              <Logout />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default TopBar;
