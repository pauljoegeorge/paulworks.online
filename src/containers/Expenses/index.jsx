import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import moment from "moment";
import { CustomRow as Row } from "../../components/Table";
import InputSelect from "../../components/InputSelect";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
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
import { FlexContainer } from "../../components/Container";
import { LeftArrow, RightArrow, DownloadIcon } from "../../components/Icon";

function ExpensesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
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
        const { pristine, valid } = getState();
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
                <H2Purple>{date}</H2Purple>
                <RightArrow onClick={() => handleMonthChange("next")} />
                <DownloadIcon onClick={() => handleExportReport()} />
              </FlexContainer>
              <>
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
                        label="Notes"
                      />
                    </Col>
                  </Row>
                ))}
              </>
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
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default ExpensesContainer;
