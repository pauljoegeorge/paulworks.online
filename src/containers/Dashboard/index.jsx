import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import PlannedExpenses from "./PlannedExpenses";
import { PBold, H1 } from "../../components/Text";
import UnPlannedExpenses from "./UnplannedExpenses";
import Forecast from "./Forecast";

const InfoBox = styled(Col)`
  background: #f6f5f5;
  border-radius: 10px;
`;

function DashboardContent() {
  return (
    <>
      <Toolbar />
      <Container fluid>
        <Row className="justify-content-between">
          <InfoBox sm={3} className="mt-3 py-5">
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
          </InfoBox>
          <InfoBox sm={3} className="mt-3 py-5">
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
          </InfoBox>
          <InfoBox sm={3} className="mt-3 py-5">
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
          </InfoBox>
        </Row>
        <Row className="mt-5">
          <Forecast />
        </Row>
        <PlannedExpenses />
        <UnPlannedExpenses />
      </Container>
    </>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
