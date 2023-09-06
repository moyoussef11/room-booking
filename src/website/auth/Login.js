import axios from "axios";
import React, { useState } from "react";
import { BASEURL, LOGIN } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookie from "cookie-universal";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cookie = Cookie();

  const nav = useNavigate();
  async function Submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASEURL}/${LOGIN}`,
        {
          email: email,
          password: password,
        });
      const token = res.data.data.token;
      cookie.set("BookRooms", token);
      nav("/dashboard");
      setLoading(true);
    } catch (err) {
      setError(err.response.status);
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="info-form">
        <div className="form">
          <Form onSubmit={Submit}>
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
            {error === 401 && (
              <p className="error">Oops! Password or Email is incorrect.</p>
            )}
            {error === 422 && (
              <p className="error">
                The password must be at least 8 characters
              </p>
            )}
            <Button variant="success" type="submit" className="btn">
              Login
            </Button>
            <p className="mt-4 text-center">
              Don't have an account?<Link to="/register">Register</Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
