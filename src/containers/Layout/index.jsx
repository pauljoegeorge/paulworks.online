import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./Navbar";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";

const Wrapper = styled.div`
  background-color: #fff;
`;
const ChildWrapper = styled.div`
  // border: 3px solid red;
  // min-height: 80vh;
`;

function LayoutContainer(props) {
  const { children } = props;
  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${process.env.PUBLIC_URL}/privacy.html`, "_blank");
  };

  return (
    <Wrapper>
      <NavigationBar {...children?.props} />
      <Container fluid style={{ marginTop: "70px", height: "100vh" }}>
        <Row>
          <Col>
            <ChildWrapper>{children}</ChildWrapper>
          </Col>
          {/* <Col xs={2}><ChildWrapper /></Col>
          <Col xs={8} style={{width: '100vh'}}>
            {children}
          </Col> */}
        </Row>
      </Container>
      <footer className="mt-5 py-3">
        <Container>
          <div className="text-center">
            <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
            <p>&copy; 2022 Paul Joe George. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </Wrapper>
  );
}

LayoutContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
