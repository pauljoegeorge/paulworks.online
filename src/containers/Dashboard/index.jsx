import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import ExpenseInsight from "./components/ExpenseInsight";
import OverallExpenseInsight from "./components/OverallExpenseInsight";
import { useInsights } from "./hooks/useInsights";
import NoticeBox from "./components/NoticeBox";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import CentralLoader from "../../components/CentralLoader";
import { FlexContainer } from "../../components/Container";
import { LeftArrow, RightArrow } from "../../components/Icon";
import { H2Purple, P } from "../../components/Text";
import { formattedCurrency } from "../../utils/currency";
import TableLayout from "../../components/TableLayout";
import { getBeginningOfMonth } from "../../utils/date";
import SpendingRecommendations from "./components/SpendingRecommendations";
import DailyExpenseReport from "./components/DailyExpenseReport";
import WeeklyExpenseReport from "./components/WeeklyExpenseReport";
import { MainWrapper } from "./components/Div";

function DashboardContent() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const date = moment(selectedMonth).format("MMMM YYYY");
  const currentMonth = getBeginningOfMonth();
  const isCurrentMonth = currentMonth === selectedMonth;
  const { isLoading, expenseInsights, actions } = useInsights();
  const {
    expense_by_categories,
    weekly_expense,
    todays_expense,
    allowance_per_day,
    allowance_per_week,
    daily_report,
    weekly_report,
    top_transactions,
    popular_transactions,
  } = expenseInsights || [];
  const { totalBudget, totalExpense } = (expense_by_categories || []).reduce(
    (totals, category) => {
      return {
        totalBudget: totals.totalBudget + (category?.budget || 0),
        totalExpense: totals.totalExpense + (category?.total_expense || 0),
      };
    },
    { totalBudget: 0, totalExpense: 0 }
  );
  const totalBalance = formattedCurrency(totalBudget - totalExpense);
  const filteredExpenseCategories = (expense_by_categories || []).filter(
    (category) => category.total_expense_of_week !== 0
  );
  const showQuota =
    isCurrentMonth && (allowance_per_day !== 0 || allowance_per_week !== 0);

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getExpenseInsights(selectedMonth);
      setPageLoading(false);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  return (
    <MainWrapper>
      {isLoading || pageLoading ? (
        <CentralLoader />
      ) : (
        <>
          <Toolbar />
          <Container fluid>
            <FlexContainer alignItems="center" className="mb-5">
              <LeftArrow onClick={() => handleMonthChange("previous")} />
              <H2Purple>{date}</H2Purple>
              <RightArrow onClick={() => handleMonthChange("next")} />
            </FlexContainer>
            <NoticeBox
              data={[
                {
                  key: "todays",
                  head: "Today's Expense",
                  value: formattedCurrency(todays_expense),
                },
                {
                  key: "balance",
                  head: "Balance",
                  value: totalBalance,
                },
                {
                  key: "weekly",
                  head: "Weekly Expense",
                  value: formattedCurrency(weekly_expense),
                },
              ]}
            />
            {showQuota && (
              <Row className="mt-5">
                <SpendingRecommendations
                  allowancePerDay={allowance_per_day}
                  allowancePerWeek={allowance_per_week}
                />
              </Row>
            )}
            <Row className="mt-5">
              <OverallExpenseInsight expenseInsights={expenseInsights} />
            </Row>
            <Row className="mt-5">
              <ExpenseInsight expenseInsights={expenseInsights} />
            </Row>
            <Row className="mt-5">
              <Col>
                <DailyExpenseReport dailyReport={daily_report} />
              </Col>
              <Col>
                <WeeklyExpenseReport weeklyReport={weekly_report} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                {isCurrentMonth && filteredExpenseCategories.length > 0 && (
                  <TableLayout
                    title="Current Week Expenses"
                    heads={["Category", "Amount"]}
                  >
                    {(filteredExpenseCategories || []).map((category) => (
                      <tr>
                        <td>
                          <P>{category.name}</P>
                        </td>
                        <td>
                          <P>
                            {formattedCurrency(category.total_expense_of_week)}
                          </P>
                        </td>
                      </tr>
                    ))}
                  </TableLayout>
                )}
              </Col>
              <Col>
                {top_transactions.length > 0 && (
                  <TableLayout
                    title="Top Transactions"
                    heads={["Category", "Amount", "Date", "Notes"]}
                  >
                    {(top_transactions || []).map((transaction) => (
                      <tr>
                        <td>
                          <P>{transaction.category_name}</P>
                        </td>
                        <td>
                          <P>{formattedCurrency(transaction.amount)}</P>
                        </td>
                        <td>
                          <P>{transaction.transaction_date}</P>
                        </td>
                        <td>
                          <P>{transaction.notes}</P>
                        </td>
                      </tr>
                    ))}
                  </TableLayout>
                )}
              </Col>
              <Col>
                {Object.keys(popular_transactions).length > 0 && (
                  <TableLayout
                    title="Popular Transactions"
                    heads={["Notes", "Total Transactions", "Total Spent"]}
                  >
                    {Object.entries(popular_transactions || []).map(
                      ([notes, transaction]) => (
                        <tr>
                          <td>
                            <P>{notes}</P>
                          </td>
                          <td>
                            <P>{transaction.count}</P>
                          </td>
                          <td>
                            <P>{formattedCurrency(transaction.total_spent)}</P>
                          </td>
                        </tr>
                      )
                    )}
                  </TableLayout>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </MainWrapper>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
