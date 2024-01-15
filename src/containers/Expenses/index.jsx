import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import moment from "moment";
import { CustomRow as Row } from "../../components/Table";
import InputSelect from "../../components/InputSelect";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple, H1Span } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useExpenses } from "./hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import WiseLogo from "../../assets/wise-logo.png";
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
import { colors } from "../../utils/colors";

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
            <CentralDiv className="justify-content-center text-center">
              <Row className="w-100 mb-5">
                <Col sm={12}>
                  <H1>Expenses</H1>
                </Col>
              </Row>
              <FlexContainer alignItems="baseline">
                <LeftArrow onClick={() => handleMonthChange("previous")} />
                <div>
                  <H2Purple>{date}</H2Purple>
                  <H1Span color={colors.primary}>Total: {totalExpense}</H1Span>
                </div>
                <RightArrow onClick={() => handleMonthChange("next")} />
                {!viewMode && (
                  <TableViewMode onClick={() => setViewMode(true)} />
                )}
                {viewMode && <EditMode onClick={() => setViewMode(false)} />}
                <DownloadIcon onClick={() => handleExportReport()} />
              </FlexContainer>
              {viewMode ? (
                <ExpensesViewMode
                  expenses={initialValues.expenses}
                  handleSortExpenses={handleSortExpenses}
                  sortParams={sortParams}
                  setSortParams={setSortParams}
                />
              ) : (
                <div className="mt-3">
                  {(initialValues.expenses || []).map((_, index) => (
                    <Row className="mt-3 w-100 justify-content-center text-center">
                      <Col xs={6} md={3} lg={3}>
                        <Field
                          name={`expenses[${index}].category_uid`}
                          component={InputSelect}
                          options={fixedExpenseOptions}
                        />
                      </Col>
                      <Col xs={6} md={3} lg={3}>
                        <Field
                          name={`expenses[${index}].amount`}
                          component={Input}
                          validate={number}
                          label="Amount"
                        />
                      </Col>
                      <Col xs={6} md={3} lg={3}>
                        <Field
                          name={`expenses[${index}].transaction_date`}
                          component={Input}
                          type="date"
                          label="Date"
                        />
                      </Col>
                      <Col xs={6} md={3} lg={3}>
                        <Field
                          name={`expenses[${index}].notes`}
                          component={Input}
                          label={
                            expenses[index].transaction_source === "wise" ? (
                              <img
                                src={WiseLogo}
                                alt="wise logo"
                                height="20px"
                              />
                            ) : (
                              "Notes"
                            )
                          }
                        />
                      </Col>
                    </Row>
                  ))}
                  <Row className="mt-3 w-100 justify-content-center text-center">
                    <PrimaryButton
                      variant="primary"
                      size="lg"
                      className="w-50"
                      type="submit"
                      disabled={pristine || !valid}
                    >
                      Save
                    </PrimaryButton>
                  </Row>
                </div>
              )}
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default ExpensesContainer;
