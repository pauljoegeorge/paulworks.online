import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { LeftArrow, RightArrow } from "../../components/Icon";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useIncome } from "./hooks/useIncome";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { FlexContainer } from "../../components/Container";
import { getBeginningOfMonth } from "../../utils/date";

function IncomeContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { actions, incomes } = useIncome();
  const currentMonth = getBeginningOfMonth();
  const { number } = useValidations();
  const date = moment(selectedMonth).format("MMMM YYYY");
  const prevWeekDisabled = currentMonth === selectedMonth;

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getIncomes(selectedMonth);
    }
  }, [selectedMonth]);

  const handleSubmit = (values) => {
    actions.updateIncomes(values, selectedMonth);
  };

  const handleMonthChange = (direction) => {
    if (prevWeekDisabled && direction === "previous") return 0;

    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const initialValues = {
    incomes,
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
                  <H1>Income</H1>
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
                {(initialValues.incomes || []).map((_, index) => (
                  <Field
                    name={`incomes[${index}].amount`}
                    component={Input}
                    validate={number}
                  />
                ))}
              </Row>
              <Row className="mt-3 w-100 justify-content-center text-center">
                <PrimaryButton
                  size="lg"
                  className="w-50"
                  type="submit"
                  disabled={pristine || !valid}
                >
                  Update Income
                </PrimaryButton>
              </Row>
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default IncomeContainer;
