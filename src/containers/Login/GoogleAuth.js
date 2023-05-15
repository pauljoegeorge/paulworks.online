import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Google } from "@mui/icons-material";

function GoogleAuth() {
  const handleOAuth = async () => {
    const response = await fetch("http://localhost:3000/api/v1/auth/google");
    const data = await response.json();
    window.open(data.url, "_self");
  };

  return (
    <Button className="w-100" variant="danger" size="lg" onClick={handleOAuth}>
      <Row>
        <Col sm={2} xxl={4} className="text-end">
          <Google />
        </Col>
        <Col sm={10} xxl={8} className="text-start">
          Sign in with Google
        </Col>
      </Row>
    </Button>
  );
}

export default GoogleAuth;
