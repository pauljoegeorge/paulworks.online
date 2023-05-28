import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import PlannedExpenses from "./components/PlannedExpenses";
import UnPlannedExpenses from "./components/UnplannedExpenses";
import Forecast from "./components/Forecast";
import { useInsights } from "./hooks/useInsights";

function DashboardContent() {
  const { isLoading, insights, actions } = useInsights();
  const { fixed_expenses, unexpected_expenses, forecast } = insights;

  useEffect(() => {
    actions.getInsights();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container fluid>
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        </Container>
      ) : (
        <>
          <Toolbar />
          <Container fluid>
            <Row className="mt-5">
              <Forecast forecast={forecast} />
            </Row>
            <PlannedExpenses fixedExpenses={fixed_expenses} />
            <UnPlannedExpenses unexpectedExpenses={unexpected_expenses} />
          </Container>
        </>
      )}
    </>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
