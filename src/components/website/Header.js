import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Cookie from "cookie-universal";
import Logout from "../../website/auth/Logout";
import "./nav-footer.css";
import { useContext } from "react";
import  { userContext } from "../../Context/UserContext";

const Header = () => {
  const cookie = Cookie();
  const token = cookie.get("BookRooms");

  const user = useContext(userContext);

  const role = user.role;

  let navbarTemplate;

  if (role === "admin") {
    navbarTemplate = (
      <Navbar expand="lg" className="header">
        <Container>
          <Link className="navbar-brand logo" to="/">
            Booking
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navLink">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
              <Link>
                <Logout />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    navbarTemplate = (
      <Navbar expand="lg" className="header">
        <Container>
          <Link className="navbar-brand logo" to="/">
            Booking
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navLink">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <Link>
                <Logout />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <>
        {token ? (
          navbarTemplate
        ) : (
          <Navbar expand="lg" className="header">
            <Container>
              <Link to="/" className="navbar-brand logo">
                Booking
              </Link>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="toggle"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex align-items-center justify-content-center">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                  <NavLink to="/register" className="nav-link btn-auth">
                    Register
                  </NavLink>
                  <NavLink className="nav-link btn-auth" to="/login">
                    login
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
    </>
  );
};

export default Header;
