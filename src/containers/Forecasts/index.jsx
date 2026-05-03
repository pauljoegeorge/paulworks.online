import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Table, Button } from "react-bootstrap";
import { useForecasts } from "./hooks/useForecasts";
import CentralLoader from "../../components/CentralLoader";
import { MainWrapper } from "../Dashboard/components/Div";
import { H2Purple } from "../../components/Text";

function Card({ children, className = "" }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        marginBottom: "20px"
      }}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <div style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", padding: "10px 16px", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.3px", borderBottom: "1px solid var(--border)" }}>
      {children}
    </div>
  );
}

function CardBody({ children }) {
  return <div style={{ padding: "16px" }}>{children}</div>;
}

export default function ForecastsContainer() {
  const { isLoading, isGenerating, forecasts, error, actions } = useForecasts();

  useEffect(() => { actions.getForecasts(); }, []);

  const muted = { color: "var(--muted-foreground)", fontSize: "0.875rem" };

  return (
    <MainWrapper>
      <Toolbar />
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <H2Purple>Expense Forecasts</H2Purple>
          <Button 
            variant="primary" 
            onClick={actions.generateForecast} 
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate New Forecast"}
          </Button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {isLoading && <CentralLoader />}

        {!isLoading && forecasts.length === 0 && (
          <div className="alert alert-info">No forecasts available. Generate one to see predictions.</div>
        )}

        {!isLoading && forecasts.map((forecastData) => {
          const analytics = forecastData.analytics || {};
          const generatedDate = new Date(forecastData.generated_on).toLocaleDateString(undefined, {
             year: 'numeric', month: 'long', day: 'numeric'
          });

          return (
            <Card key={forecastData.id}>
              <CardHeader>Forecast from {generatedDate}</CardHeader>
              <CardBody>
                <div style={{ marginBottom: "16px", fontSize: "1.125rem", fontWeight: "bold" }}>
                  Expected Total Expense: {analytics.forecasted_total_expense}
                </div>
                {analytics.message && (
                  <div style={{ marginBottom: "16px", ...muted }}>
                    {analytics.message}
                  </div>
                )}
                <h6 style={{ fontWeight: 600, marginTop: "20px" }}>Forecast by Category</h6>
                <Table responsive size="sm" style={{ marginTop: "10px" }}>
                  <thead style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                    <tr>
                      <th>Category</th>
                      <th>Forecasted Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.forecast_by_category?.length > 0 ? (
                      analytics.forecast_by_category.map((item) => (
                        <tr key={item.category}>
                          <td>{item.category}</td>
                          <td>{item.forecasted_amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="2" style={{ ...muted, textAlign: "center", padding: "16px" }}>No category breakdown available.</td></tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          );
        })}
      </Container>
    </MainWrapper>
  );
}
