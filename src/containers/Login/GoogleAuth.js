import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import GoogleLogo from "../../assets/google.png";

const Image = styled.img`
  max-width: 25px;
  max-height: 25px;
  margin-bottom: 3px;
`;

function GoogleAuth(props) {
  const { oauthUrl } = props;

  const handleOAuth = () => {
    window.open(oauthUrl, "_self");
  };

  return (
    <Button
      className="w-100"
      variant="outline-secondary"
      size="lg"
      onClick={handleOAuth}
    >
      <Row>
        <Col xs={2} sm={4} xxl={4} className="text-end">
          <Image src={GoogleLogo} alt="google" />
        </Col>
        <Col xs={10} sm={8} xxl={8} className="text-start">
          Sign in with Google
        </Col>
      </Row>
    </Button>
  );
}

GoogleAuth.propTypes = {
  oauthUrl: PropTypes.string.isRequired,
};

export default GoogleAuth;
