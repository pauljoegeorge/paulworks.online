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
import { H2Purple } from "../../components/Text";
import { formattedCurrency } from "../../utils/currency";
import { getBeginningOfMonth } from "../../utils/date";
import SpendingRecommendations from "./components/SpendingRecommendations";
import DailyExpenseReport from "./components/DailyExpenseReport";
import WeeklyExpenseReport from "./components/WeeklyExpenseReport";
import { MainWrapper } from "./components/Div";
import ExpenseSummary from "./components/ExpenseSummary";

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
            <ExpenseSummary
              isCurrentMonth={isCurrentMonth}
              filteredExpenseCategories={filteredExpenseCategories}
              topTransactions={top_transactions}
              popularTransactions={popular_transactions}
            />
          </Container>
        </>
      )}
    </MainWrapper>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
