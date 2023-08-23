import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import moment from "moment";
import { Container, Row, Spinner } from "react-bootstrap";
import ExpenseInsight from "./components/ExpenseInsight";
import OverallExpenseInsight from "./components/OverallExpenseInsight";
import { useInsights } from "./hooks/useInsights";
import NoticeBox from "./components/NoticeBox";
import { Flex } from "../../components/Div";
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

function DashboardContent() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const date = moment(selectedMonth).format("MMMM YYYY");
  const { isLoading, expenseInsights, actions } = useInsights();
  const { expense_by_categories } = expenseInsights || [];
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
    <>
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
            <NoticeBox data={[{ head: "Balance", value: totalBalance }]} />
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
