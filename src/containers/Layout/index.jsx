import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";

const Wrapper = styled.div`
  background-color: ${(props) => (props.landingPage ? "#fff" : "#fff")};
  min-height: 100vh;
  overflow-y: auto;
`;

const ChildWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
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
    <Wrapper landingPage={window.location.pathname === "/"}>
      <Container fluid style={{ paddingLeft: "0px" }}>
        <Row>
          <Col>
            <ChildWrapper>{children}</ChildWrapper>
          </Col>
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
