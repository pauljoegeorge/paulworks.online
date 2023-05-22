import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { H1, PBold } from "../../../components/Text";

const Box = styled(Col)`
  background: #f6f5f5;
  border-radius: 10px;
`;

function InfoBox() {
  return (
    <Row className="justify-content-between">
      <Box sm={3} className="mt-3 py-5">
        <Row className="justify-content-center text-center">
          <Col>
            <PBold>Savings</PBold>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <H1>$100</H1>
          </Col>
        </Row>
      </Box>
      <Box sm={3} className="mt-3 py-5">
        <Row className="justify-content-center text-center">
          <Col>
            <PBold>Savings</PBold>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <H1>$100</H1>
          </Col>
        </Row>
      </Box>
      <Box sm={3} className="mt-3 py-5">
        <Row className="justify-content-center text-center">
          <Col>
            <PBold>Savings</PBold>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <H1>$100</H1>
          </Col>
        </Row>
      </Box>
    </Row>
  );
}

export default InfoBox;
