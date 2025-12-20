import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Table,
  Alert,
} from "react-bootstrap";
import { get } from "../../utils/api";
import CentralLoader from "../../components/CentralLoader";
import { MainWrapper } from "../Dashboard/components/Div";
import { H2Purple } from "../../components/Text";

export default function InsightsContainer() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("expense_insights");
        setData(response);
      } catch (err) {
        setError("Failed to load insights.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CentralLoader />;
  if (error)
    return (
      <MainWrapper>
        <Toolbar />
        <Container fluid>
          <Alert variant="danger">{error}</Alert>
        </Container>
      </MainWrapper>
    );
  if (!data)
    return (
      <MainWrapper>
        <Toolbar />
        <Container fluid>
          <Alert variant="info">No insights available.</Alert>
        </Container>
      </MainWrapper>
    );

  const {
    summary_by_category,
    budget_warnings,
    merchant_insights,
    time_trends,
    behavioral_insights,
    smart_highlights,
    metrics,
  } = data;

  const renderOverBudget = () => {
    if (!budget_warnings?.over_budget?.length) return null;
    return (
      <div className="mb-3">
        <strong>Over Budget:</strong>
        <div>
          {budget_warnings.over_budget.map((cat) => (
            <Badge bg="danger" className="me-1" key={cat}>
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const renderCloseToLimit = () => {
    if (!budget_warnings?.close_to_limit?.length) return null;
    return (
      <div>
        <strong>Close to Limit:</strong>
        <div>
          {budget_warnings.close_to_limit.map((cat) => (
            <Badge bg="warning" text="dark" className="me-1" key={cat}>
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const renderBudgetWarnings = () => {
    if (
      !budget_warnings ||
      (!budget_warnings.over_budget?.length &&
        !budget_warnings.close_to_limit?.length)
    ) {
      return <p className="text-muted">No warnings at this time.</p>;
    }

    return (
      <>
        {renderOverBudget()}
        {renderCloseToLimit()}
      </>
    );
  };

  const renderMerchantTop = () => {
    if (
      !merchant_insights?.top_merchants ||
      merchant_insights.top_merchants.length === 0
    ) {
      return <p className="text-muted">No data.</p>;
    }
    return (
      <ul className="list-unstyled">
        {merchant_insights.top_merchants.map((m) => (
          <li key={m.merchant} className="mb-2 d-flex justify-content-between">
            <span>{m.merchant}</span>
            <strong>{m.spent}</strong>
          </li>
        ))}
      </ul>
    );
  };

  const renderMerchantFrequent = () => {
    if (
      !merchant_insights?.most_frequent_merchants ||
      merchant_insights.most_frequent_merchants.length === 0
    ) {
      return <p className="text-muted">No data.</p>;
    }
    return (
      <ul className="list-unstyled">
        {merchant_insights.most_frequent_merchants.map((m) => (
          <li key={m.merchant} className="mb-2 d-flex justify-content-between">
            <span>{m.merchant}</span>
            <Badge bg="info">{m.count}</Badge>
          </li>
        ))}
      </ul>
    );
  };

  const renderAnomalies = () => {
    if (
      !merchant_insights?.anomalies ||
      merchant_insights.anomalies.length === 0
    ) {
      return <p className="text-muted">No anomalies detected.</p>;
    }
    return merchant_insights.anomalies.map((a) => (
      <Alert variant="warning" key={a.merchant}>
        <strong>{a.merchant}</strong>: {a.transaction}
        <div className="small">{a.note}</div>
      </Alert>
    ));
  };

  return (
    <MainWrapper>
      <Toolbar />
      <Container fluid>
        <H2Purple className="mb-4">Financial Insights</H2Purple>

        {/* Smart Highlights */}
        {smart_highlights && smart_highlights.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Card className="bg-light border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>Smart Highlights</Card.Title>
                  <ul>
                    {smart_highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Budget Warnings & Metrics */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-danger text-white">
                Budget Warnings
              </Card.Header>
              <Card.Body>{renderBudgetWarnings()}</Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header>Key Metrics</Card.Header>
              <Card.Body>
                <Row className="mb-2">
                  <Col xs={6}>
                    <strong>Total Transactions:</strong>
                  </Col>
                  <Col xs={6}>{metrics?.total_transactions ?? 0}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={6}>
                    <strong>Avg Spend/Tx:</strong>
                  </Col>
                  <Col xs={6}>{metrics?.avg_spend_per_transaction ?? 0}</Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={6}>
                    <strong>Most Tx Category:</strong>
                  </Col>
                  <Col xs={6}>
                    {metrics?.category_with_most_transactions || "N/A"}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <strong>Largest Share:</strong>
                  </Col>
                  <Col xs={6}>
                    {metrics?.category_with_largest_share || "N/A"}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Summary by Category */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Header>Summary by Category</Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Spent</th>
                      <th>Budget</th>
                      <th>Remaining</th>
                      <th>% Used</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary_by_category && summary_by_category.length > 0 ? (
                      summary_by_category.map((item) => (
                        <tr key={item.category}>
                          <td>{item.category}</td>
                          <td>{item.spent}</td>
                          <td>{item.budget}</td>
                          <td>{item.remaining}</td>
                          <td>{item.percent_used}%</td>
                          <td>
                            <Badge
                              bg={
                                {
                                  ok: "success",
                                  careful: "warning",
                                  unused: "secondary",
                                }[item.status] || "danger"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No category data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Merchant Insights */}
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 shadow-sm">
              <Card.Header>Top Merchants</Card.Header>
              <Card.Body>{renderMerchantTop()}</Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <Card className="h-100 shadow-sm">
              <Card.Header>Frequent Merchants</Card.Header>
              <Card.Body>{renderMerchantFrequent()}</Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Header>Anomalies</Card.Header>
              <Card.Body>{renderAnomalies()}</Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Time Trends & Behavioral */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Card className="h-100 shadow-sm">
              <Card.Header>Time Trends</Card.Header>
              <Card.Body>
                <p>
                  <strong>Avg Daily Spend:</strong>{" "}
                  {time_trends?.avg_daily_spend ?? 0}
                </p>
                <p>
                  <strong>Required Daily to Stay in Budget:</strong>{" "}
                  {time_trends?.required_daily_spend_to_stay_in_budget ?? 0}
                </p>
                <p>
                  <strong>Peak Spending Day:</strong>{" "}
                  {time_trends?.peak_spending_day || "N/A"}
                </p>
                <p>
                  <strong>Rolling Weekly Spend:</strong>{" "}
                  {time_trends?.rolling_weekly_spend ?? 0}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header>Behavioral Insights</Card.Header>
              <Card.Body>
                {behavioral_insights && behavioral_insights.length > 0 ? (
                  <ul>
                    {behavioral_insights.map((insight) => (
                      <li key={insight}>{insight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No behavioral insights.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainWrapper>
  );
}
