import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { List } from "@mui/material";
import { Menu, ChevronLeft } from "@mui/icons-material";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";
import { mainListItems } from "./listItems";
import { isMobile } from "../../utils/utils";

const FixedCol = styled(Col)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 1;
`;

const MovableCol = styled(Col)`
  position: relative;
  padding-left: ${(props) => (props.isMobile ? "20px" : "200px")};
`;

const NavWrapper = styled.div`
  background-color: #f8f9fa;
  z-index: 1;
`;

const OpenButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  height: 50px;
`;

function AppLayout(props) {
  const { children } = props;
  const mobile = isMobile();
  const [showNavbar, setShowNavbar] = useState(!mobile);

  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${process.env.PUBLIC_URL}/privacy.html`, "_blank");
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <FixedCol sm={2} xl={3} xxl={2}>
          {showNavbar ? (
            <NavWrapper>
              <OpenButton onClick={handleToggleNavbar}>
                <ChevronLeft />
              </OpenButton>
              <Navbar className="justify-content-start">
                <Nav className="flex-column" style={{ height: "100vh" }}>
                  <List component="nav">{mainListItems}</List>
                </Nav>
              </Navbar>
            </NavWrapper>
          ) : (
            <OpenButton onClick={handleToggleNavbar}>
              <Menu />
            </OpenButton>
          )}
        </FixedCol>
        <MovableCol sm={10} xl={9} xxl={10} isMobile={mobile}>
          {children}
          <footer className="mt-5 py-3">
            <Container>
              <div className="text-center">
                <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
                <p>&copy; 2022 Paul Joe George. All rights reserved.</p>
              </div>
            </Container>
          </footer>
        </MovableCol>
      </Row>
    </Container>
  );
}

AppLayout.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
