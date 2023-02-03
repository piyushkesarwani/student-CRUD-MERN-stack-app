import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

export const Header = ({ loginUser }) => {
  return (
    <>
      <Navbar bg="light" className="border" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button>{loginUser.email}</Button>
            </Nav>
            <Nav.Link href="/login" className="ms-3 me-3">
              Login
            </Nav.Link>
            <Nav.Link href="/register" className="">
              Sign Up
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
