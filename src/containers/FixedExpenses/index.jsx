import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useFixedExpense } from "./hooks/useFixedExpense";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { FlexContainer } from "../../components/Container";
import { LeftArrow, RightArrow } from "../../components/Icon";
import { getBeginningOfMonth } from "../../utils/date";

function FixedExpensesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const { actions, fixedExpenses } = useFixedExpense();
  const date = moment(selectedMonth).format("MMMM YYYY");
  const initialValues = { fixedExpenses };
  const prevWeekDisabled = currentMonth === selectedMonth;

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getFixedExpenses(selectedMonth);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    if (prevWeekDisabled && direction === "previous") return 0;

    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const handleSubmit = (values) => {
    actions.updateFixedExpenses(values, selectedMonth);
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
                  <H1>Planned Expense</H1>
                </Col>
              </Row>
              <FlexContainer alignItems="baseline">
                <LeftArrow
                  disabled={prevWeekDisabled}
                  onClick={() => handleMonthChange("previous")}
                />
                <H2Purple>{date}</H2Purple>
                <RightArrow onClick={() => handleMonthChange("next")} />
              </FlexContainer>
              <Row className="mt-3 w-100 justify-content-center text-center">
                {(initialValues.fixedExpenses || []).map((_, index) => (
                  <Field
                    name={`fixedExpenses[${index}].amount`}
                    component={Input}
                    validate={number}
                  />
                ))}
              </Row>
              <Row className="mt-3 w-100 justify-content-center text-center">
                <PrimaryButton
                  variant="primary"
                  size="lg"
                  className="w-50"
                  type="submit"
                  disabled={pristine || !valid}
                >
                  Update Expense
                </PrimaryButton>
              </Row>
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default FixedExpensesContainer;
