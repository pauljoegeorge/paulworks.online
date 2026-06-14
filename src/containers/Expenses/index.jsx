import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import InputSelect from "../../components/InputSelect";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple, H1Span } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useExpenses } from "./hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";

import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { formattedCurrency } from "../../utils/currency";
import { FlexContainer } from "../../components/Container";
import {
  LeftArrow,
  RightArrow,
  DownloadIcon,
  TableViewMode,
  EditMode,
} from "../../components/Icon";
import { getDefaultExpenseSortParams } from "./utils/utils";
import ExpensesViewMode from "./ExpenseViewMode";

function ExpensesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [viewMode, setViewMode] = useState(false);
  const [sortParams, setSortParams] = useState(getDefaultExpenseSortParams());
  const { number } = useValidations();
  const { actions, expenses } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const date = moment(selectedMonth).format("MMMM YYYY");
  const initialValues = { expenses };
  const fixedExpenseOptions = Object.keys(fixedExpenseCategories).map(
    (ind) => ({
      value: fixedExpenseCategories[ind].uid,
      label: fixedExpenseCategories[ind].name,
    })
  );

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const query = new URLSearchParams(window.location.search);
      const category = query.get("category") || "";
      setSortParams(getDefaultExpenseSortParams());
      actions.getExpenses(selectedMonth, category);
      budgetActions.getExpenseCategories(selectedMonth);
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

  const handleSortExpenses = (sortBy, sortOrder) => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get("category") || "";
    actions.getExpenses(selectedMonth, category, sortBy, sortOrder);
  };

  const handleExportReport = () => {
    actions.exportExpenses(selectedMonth);
  };

  const handleSubmit = (values) => {
    actions.updateExpenses(values, selectedMonth);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid, values } = getState();
        const totalExpense = formattedCurrency(
          values.expenses.reduce(
            (total, expense) => total + parseInt(expense.amount || 0, 10),
            0
          )
        );
        return (
          <form onSubmit={formHandleSubmit}>
            <CentralDiv className="text-center">
              <div className="w-full mb-12 text-center">
                <H1>Expenses</H1>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <FlexContainer alignItems="center">
                  <LeftArrow onClick={() => handleMonthChange("previous")} />
                  <div style={{ textAlign: "center" }}>
                    <H2Purple>{date}</H2Purple>
                    <H1Span color="var(--primary)">
                      Total: {totalExpense}
                    </H1Span>
                  </div>
                  <RightArrow onClick={() => handleMonthChange("next")} />
                </FlexContainer>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {!viewMode && (
                    <TableViewMode onClick={() => setViewMode(true)} />
                  )}
                  {viewMode && <EditMode onClick={() => setViewMode(false)} />}
                  <DownloadIcon onClick={() => handleExportReport()} />
                </div>
              </div>
            </CentralDiv>
            {viewMode ? (
              <div style={{ width: "100%", padding: "0 16px" }}>
                <ExpensesViewMode
                  expenses={initialValues.expenses}
                  handleSortExpenses={handleSortExpenses}
                  sortParams={sortParams}
                  setSortParams={setSortParams}
                />
              </div>
            ) : (
              <CentralDiv>
                <div className="mt-4 w-full">
                  {/* eslint-disable react/no-array-index-key */}
                  {(initialValues.expenses || []).map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full"
                    >
                      <Field
                        name={`expenses[${index}].category_uid`}
                        component={InputSelect}
                        options={fixedExpenseOptions}
                        label="Category"
                      />
                      <Field
                        name={`expenses[${index}].amount`}
                        component={Input}
                        validate={number}
                        label="Amount"
                      />
                      <Field
                        name={`expenses[${index}].transaction_date`}
                        component={Input}
                        type="date"
                        label="Date"
                      />
                      <Field
                        name={`expenses[${index}].notes`}
                        component={Input}
                        label="Notes"
                      />
                    </div>
                  ))}
                  <div className="flex justify-center mt-8 w-full">
                    <PrimaryButton
                      size="lg"
                      className="w-50"
                      type="submit"
                      disabled={pristine || !valid}
                    >
                      Save
                    </PrimaryButton>
                  </div>
                </div>
              </CentralDiv>
            )}
          </form>
        );
      }}
    />
  );
}

export default ExpensesContainer;
