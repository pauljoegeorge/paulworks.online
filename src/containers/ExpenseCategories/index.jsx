import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import moment from "moment";
import { CustomRow as Row } from "../../components/Table";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useBudget } from "./hooks/useBudget";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { FlexContainer } from "../../components/Container";
import { LeftArrow, RightArrow, PlusIcon } from "../../components/Icon";
import { getBeginningOfMonth } from "../../utils/date";

function ExpenseCategoriesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const { actions, fixedExpenseCategories } = useBudget();
  const date = moment(selectedMonth).format("MMMM YYYY");
  const initialValues = { fixedExpenseCategories };
  const [numExpenseCategories, setNumExpenseCategories] = useState(
    fixedExpenseCategories.length
  );
  const prevWeekDisabled = currentMonth === selectedMonth;

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    setNumExpenseCategories(fixedExpenseCategories.length);
  }, [fixedExpenseCategories]);

  useEffect(() => {
    if (selectedMonth) {
      actions.getExpenseCategories(selectedMonth);
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

  const handleAddCategory = () => {
    setNumExpenseCategories((prevNum) => prevNum + 1);
  };

  const handleSubmit = (values) => {
    actions.updateExpenseCategories(values, selectedMonth);
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
                  <H1>Budget</H1>
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
              <>
                {Array.from({ length: numExpenseCategories }).map(
                  (_, index) => (
                    <Row className="mt-3 w-100 justify-content-center text-center">
                      <Col>
                        <Field
                          name={`fixedExpenseCategories[${index}].name`}
                          component={Input}
                          label="Category"
                        />
                      </Col>
                      <Col>
                        <Field
                          name={`fixedExpenseCategories[${index}].budget`}
                          component={Input}
                          validate={number}
                          label="Budget"
                        />
                      </Col>
                    </Row>
                  )
                )}
              </>
              <Row className="mt-3 w-100 justify-content-center text-center">
                <PlusIcon onClick={() => handleAddCategory()} />
              </Row>
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

export default ExpenseCategoriesContainer;
