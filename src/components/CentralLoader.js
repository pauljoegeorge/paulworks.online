import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { Flex } from "./Div";

function CentralLoader() {
  return (
    <Container fluid>
      <Flex align="center" justify="center" height="100vh">
        <Spinner animation="border" />
      </Flex>
    </Container>
  );
}

export default CentralLoader;
