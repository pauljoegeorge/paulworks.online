import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import PjLogo from "../../assets/PJ_Logo.png";

const Span = styled.span`
  padding: 1rem 1rem;
  display: inline-block;
  font-size: 1.2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  transition: color 0.3s;
`;

function HomeNavbar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home" style={{ paddingLeft: "10px" }}>
        <img src={PjLogo} alt="pj_logo" height="80px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" data-bs-toggle="collapse">
        <span className="navbar-toggler-icon" />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="#">
            <Span>paulworks.online</Span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
