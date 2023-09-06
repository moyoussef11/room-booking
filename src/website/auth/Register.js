import axios from "axios";
import React, { useState } from "react";
import { BASEURL, REGISTER } from "../../Api/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const cookie = Cookie();
  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASEURL}/${REGISTER}`,
        {
          email: email,
          name: name,
          password: password,
        });
      const token = res.data.data.token;
      cookie.set("BookRooms", token);
      nav("/login");
      setLoading(true);
    } catch (err) {
      setEmailError(err.response.status);
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="info-form">
        <div className="form">
          <Form onSubmit={Submit}>
            <Form.Group className="mb-3" controlId="formGroupname">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {emailError === 422 && (
              <p className="error">The email has already been taken.</p>
            )}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="btn">
              Register
            </Button>
            <p className="mt-4 text-center">
              Already have an account?<Link to="/login">Log in</Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
