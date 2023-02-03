import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'

export const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    axios.post(`http://localhost:9002/login`, user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
    });

    navigate("/");
  };

  return (
    <>
      <section className="loginContainer d-flex flex-column justify-content-center align-items-center">
        <div className="border p-2 d-flex flex-column justify-content-center align-items-center bg-light">
          <h1>Login</h1>
          {console.log("login user", user)}
          <div className="loginForm">
            <Form.Group className="mb-2 mt-2">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex flex-column">
              <Button className="mb-2 mt-2" onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>register</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
