import React from "react";
import styled from "styled-components";
import { Navbar, Nav, Container } from "react-bootstrap";

const Wrapper = styled.nav`
  overflow: hidden;
`;

function NavigationBar() {
  return (
    <Wrapper>
      <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link href="/blogs">Blogs</Nav.Link>
              <Nav.Link href="#deets">More deets</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrapper>
  );
}

export default NavigationBar;
