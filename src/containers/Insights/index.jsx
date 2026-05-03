import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useInsights } from "./hooks/useInsights";
import CentralLoader from "../../components/CentralLoader";
import { MainWrapper } from "../Dashboard/components/Div";
import { H2Purple, P } from "../../components/Text";

// ─── Lightweight token-aware card ────────────────────────────────────────
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
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, variant }) {
  const styles = {
    danger:  { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" },
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

// ─── Badge ────────────────────────────────────────────────────────────────
const BADGE = {
  danger:    { bg: "var(--destructive)",         text: "var(--destructive-foreground)" },
  warning:   { bg: "rgba(245,158,11,0.15)",      text: "#92400e" },
  success:   { bg: "rgba(16,185,129,0.15)",      text: "#065f46" },
  info:      { bg: "rgba(14,165,233,0.15)",      text: "#0c4a6e" },
  secondary: { bg: "var(--muted)",               text: "var(--muted-foreground)" },
};

function Badge({ variant = "secondary", children }) {
  const { bg, text } = BADGE[variant] || BADGE.secondary;
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "var(--radius-sm)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.3px", backgroundColor: bg, color: text, marginRight: "4px", marginBottom: "4px" }}>
      {children}
    </span>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────
const ALERT = {
  danger:  { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)" },
  warning: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
  info:    { bg: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.25)" },
};

function Alert({ variant = "info", children }) {
  const { bg, border } = ALERT[variant] || ALERT.info;
  return (
    <div style={{ padding: "12px 16px", borderRadius: "var(--radius-md)", backgroundColor: bg, border: `1px solid ${border}`, color: "var(--foreground)", fontSize: "0.875rem", marginBottom: "8px" }}>
      {children}
    </div>
  );
}

// ─── InsightsContainer ────────────────────────────────────────────────────
export default function InsightsContainer() {
  const { isLoading, insights, error, actions } = useInsights();

  useEffect(() => { actions.getInsights(); }, []);

  if (isLoading) return <CentralLoader />;
  if (error)
    return <MainWrapper><Toolbar /><Container fluid><Alert variant="danger">{error}</Alert></Container></MainWrapper>;
  if (!insights || Object.keys(insights).length === 0)
    return <MainWrapper><Toolbar /><Container fluid><Alert variant="info">No insights available.</Alert></Container></MainWrapper>;

  const { summary_by_category, budget_warnings, merchant_insights, time_trends, behavioral_insights, smart_highlights, metrics } = insights;

  const muted = { color: "var(--muted-foreground)", fontSize: "0.875rem" };
  const label = { fontWeight: 600, fontSize: "0.875rem" };

  return (
    <MainWrapper>
      <Toolbar />
      <Container fluid>
        <H2Purple className="mb-4">Financial Insights</H2Purple>

        {/* Smart Highlights */}
        {smart_highlights?.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Card>
                <CardHeader>Smart Highlights</CardHeader>
                <CardBody>
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {smart_highlights.map((h) => <li key={h} style={{ marginBottom: "4px", fontSize: "0.875rem" }}>{h}</li>)}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {/* Budget Warnings & Key Metrics */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Card>
              <CardHeader variant="danger">Budget Warnings</CardHeader>
              <CardBody>
                {!budget_warnings || (!budget_warnings.over_budget?.length && !budget_warnings.close_to_limit?.length)
                  ? <P align="left" style={muted}>No warnings at this time.</P>
                  : <>
                      {budget_warnings.over_budget?.length > 0 && <div className="mb-3"><P align="left" style={label}>Over Budget:</P>{budget_warnings.over_budget.map((c) => <Badge key={c} variant="danger">{c}</Badge>)}</div>}
                      {budget_warnings.close_to_limit?.length > 0 && <div><P align="left" style={label}>Close to Limit:</P>{budget_warnings.close_to_limit.map((c) => <Badge key={c} variant="warning">{c}</Badge>)}</div>}
                    </>
                }
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Key Metrics</CardHeader>
              <CardBody>
                {[
                  ["Total Transactions",   metrics?.total_transactions ?? 0],
                  ["Avg Spend / Tx",       metrics?.avg_spend_per_transaction ?? 0],
                  ["Most Tx Category",     metrics?.category_with_most_transactions || "N/A"],
                  ["Largest Share",        metrics?.category_with_largest_share || "N/A"],
                ].map(([l, v]) => (
                  <Row key={l} className="mb-2">
                    <Col xs={6} style={label}>{l}:</Col>
                    <Col xs={6} style={{ fontSize: "0.875rem" }}>{v}</Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Summary by Category */}
        <Row className="mb-4">
          <Col>
            <Card>
              <CardHeader>Summary by Category</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                    <tr>{["Category","Spent","Budget","Remaining","% Used","Status"].map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {summary_by_category?.length > 0
                      ? summary_by_category.map((item) => (
                          <tr key={item.category}>
                            <td>{item.category}</td>
                            <td>{item.spent}</td>
                            <td>{item.budget}</td>
                            <td>{item.remaining}</td>
                            <td>{item.percent_used}%</td>
                            <td><Badge variant={{ ok: "success", careful: "warning", unused: "secondary" }[item.status] || "danger"}>{item.status}</Badge></td>
                          </tr>
                        ))
                      : <tr><td colSpan="6" style={{ textAlign: "center", ...muted, padding: "24px" }}>No category data available.</td></tr>
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Merchant Insights */}
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card>
              <CardHeader>Top Merchants</CardHeader>
              <CardBody>
                {!merchant_insights?.top_merchants?.length
                  ? <P align="left" style={muted}>No data.</P>
                  : <ul className="list-unstyled" style={{ margin: 0 }}>{merchant_insights.top_merchants.map((m) => <li key={m.merchant} className="mb-2 d-flex justify-content-between"><span>{m.merchant}</span><strong>{m.spent}</strong></li>)}</ul>
                }
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Card>
              <CardHeader>Frequent Merchants</CardHeader>
              <CardBody>
                {!merchant_insights?.most_frequent_merchants?.length
                  ? <P align="left" style={muted}>No data.</P>
                  : <ul className="list-unstyled" style={{ margin: 0 }}>{merchant_insights.most_frequent_merchants.map((m) => <li key={m.merchant} className="mb-2 d-flex justify-content-between"><span>{m.merchant}</span><Badge variant="info">{m.count}</Badge></li>)}</ul>
                }
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardHeader>Anomalies</CardHeader>
              <CardBody>
                {!merchant_insights?.anomalies?.length
                  ? <P align="left" style={muted}>No anomalies detected.</P>
                  : merchant_insights.anomalies.map((a) => <Alert key={a.merchant} variant="warning"><strong>{a.merchant}</strong>: {a.transaction}<div style={{ fontSize: "0.75rem", marginTop: "4px" }}>{a.note}</div></Alert>)
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Time Trends & Behavioral */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Card>
              <CardHeader>Time Trends</CardHeader>
              <CardBody>
                {[
                  ["Avg Daily Spend",              time_trends?.avg_daily_spend ?? 0],
                  ["Required Daily (on budget)",   time_trends?.required_daily_spend_to_stay_in_budget ?? 0],
                  ["Peak Spending Day",            time_trends?.peak_spending_day || "N/A"],
                  ["Rolling Weekly Spend",         time_trends?.rolling_weekly_spend ?? 0],
                ].map(([l, v]) => <p key={l} style={{ fontSize: "0.875rem", marginBottom: "8px" }}><strong>{l}:</strong> {v}</p>)}
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Behavioral Insights</CardHeader>
              <CardBody>
                {behavioral_insights?.length > 0
                  ? <ul style={{ margin: 0, paddingLeft: "20px" }}>{behavioral_insights.map((i) => <li key={i} style={{ marginBottom: "4px", fontSize: "0.875rem" }}>{i}</li>)}</ul>
                  : <P align="left" style={muted}>No behavioral insights.</P>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainWrapper>
  );
}
