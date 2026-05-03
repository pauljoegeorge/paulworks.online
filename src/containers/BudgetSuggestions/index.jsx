import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Table, Button, Form, InputGroup } from "react-bootstrap";
import { useBudgetSuggestions } from "./hooks/useBudgetSuggestions";
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

function CardHeader({ children, variant = "default" }) {
  const styles = {
    danger:  { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" },
    success: { backgroundColor: "rgba(16,185,129,0.15)", color: "#065f46" },
    default: { backgroundColor: "var(--muted)",       color: "var(--muted-foreground)" },
  };
  const s = styles[variant] || styles.default;
  return (
    <div style={{ ...s, padding: "10px 16px", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.3px", borderBottom: "1px solid var(--border)" }}>
      {children}
    </div>
  );
}

function CardBody({ children }) {
  return <div style={{ padding: "16px" }}>{children}</div>;
}

export default function BudgetSuggestionsContainer() {
  const { isLoading, isGenerating, suggestions, error, actions } = useBudgetSuggestions();
  const [maxOverBudget, setMaxOverBudget] = useState(0);

  useEffect(() => { actions.getSuggestions(); }, []);

  const handleGenerate = () => {
    actions.generateSuggestions(parseInt(maxOverBudget, 10) || 0);
  };

  const muted = { color: "var(--muted-foreground)", fontSize: "0.875rem" };

  return (
    <MainWrapper>
      <Toolbar />
      <Container fluid>
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <H2Purple>Budget Suggestions</H2Purple>
          <div className="d-flex align-items-center">
            <InputGroup style={{ width: '200px', marginRight: '10px' }}>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control 
                type="number" 
                placeholder="Max Over Budget" 
                value={maxOverBudget} 
                onChange={(e) => setMaxOverBudget(e.target.value)} 
              />
            </InputGroup>
            <Button 
              variant="primary" 
              onClick={handleGenerate} 
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Suggestions"}
            </Button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {isLoading && <CentralLoader />}

        {!isLoading && suggestions.length === 0 && (
          <div className="alert alert-info">No suggestions available. Generate one to see predictions.</div>
        )}

        {!isLoading && suggestions.map((suggestionData) => {
          const analytics = suggestionData.analytics || {};
          const generatedDate = new Date(suggestionData.generated_on).toLocaleDateString(undefined, {
             year: 'numeric', month: 'long', day: 'numeric'
          });

          return (
            <Card key={suggestionData.id}>
              <CardHeader variant={analytics.is_over_budget ? "danger" : "success"}>
                Suggestion from {generatedDate}
              </CardHeader>
              <CardBody>
                <div style={{ marginBottom: "16px", fontSize: "1.125rem", fontWeight: "bold" }}>
                  Expected Total Expense: {analytics.forecasted_total_expense}
                </div>
                {analytics.message && (
                  <div style={{ marginBottom: "16px", ...muted }}>
                    {analytics.message}
                  </div>
                )}
                
                {analytics.suggestions?.length > 0 && (
                  <>
                    <h6 style={{ fontWeight: 600, marginTop: "20px" }}>Suggested Reductions</h6>
                    <Table responsive size="sm" style={{ marginTop: "10px" }}>
                      <thead style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.6875rem", textTransform: "uppercase" }}>
                        <tr>
                          <th>Category</th>
                          <th>Reduce By</th>
                          <th>Target Amount</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.suggestions.map((item) => (
                          <tr key={item.category}>
                            <td>{item.category}</td>
                            <td>{item.reduce_by}</td>
                            <td>{item.target_amount}</td>
                            <td style={muted}>{item.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </CardBody>
            </Card>
          );
        })}
      </Container>
    </MainWrapper>
  );
}
