import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import GoogleLogo from "../../assets/google.png";
import { get } from "../../utils/api";

const Image = styled.img`
  max-width: 25px;
  max-height: 25px;
  margin-bottom: 3px;
`;

function GoogleAuth() {
  const handleOAuth = async () => {
    const response = await get("auth/google");
    const { url } = response;
    window.open(url, "_self");
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

export default GoogleAuth;
