import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Row, Spinner } from "react-bootstrap";
import ExpenseInsight from "./components/ExpenseInsight";
import OverallExpenseInsight from "./components/OverallExpenseInsight";
import { useInsights } from "./hooks/useInsights";

function DashboardContent() {
  const { isLoading, expenseInsights, actions } = useInsights();

  useEffect(() => {
    actions.getExpenseInsights();
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
              <OverallExpenseInsight expenseInsights={expenseInsights} />
            </Row>
            <Row className="mt-5">
              <ExpenseInsight expenseInsights={expenseInsights} />
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
