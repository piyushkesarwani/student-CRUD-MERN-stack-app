import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import './Register.css'

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
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

  const handleRegister = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      alert("Successfully registered. Now Login");
      axios
        .post(`http://localhost:9002/register`, user)
        .then((res) => alert(res.data.message));

      navigate("/login");
    } else {
      alert("invalid Register");
    }
  };

  return (
    <>
      <section className="registerContainer d-flex flex-column justify-content-center align-items-center">
        <div className="border p-2 d-flex flex-column justify-content-center align-items-center bg-light">
          <h1>Register</h1>
          {console.log("register user", user)}
          <div className="registerForm">
            <Form.Group className="mb-2 mt-2">
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-2 mt-2">
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </Form.Group>
            <div className="d-flex flex-column">
              <Button className="mb-2 mt-2" onClick={handleRegister}>
                Register
              </Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
