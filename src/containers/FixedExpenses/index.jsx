import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { isMobile } from "../../utils/utils";
import { useFixedExpense } from "./hooks/useFixedExpense";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";

function FixedExpensesContainer() {
  const { number } = useValidations();
  const { actions, fixedExpenses } = useFixedExpense();
  const mobile = isMobile();
  const date = moment().format("MMMM YYYY");
  const initialValues = { fixedExpenses };

  useEffect(() => {
    actions.getFixedExpenses();
  }, []);

  const handleSubmit = (values) => {
    actions.updateFixedExpenses(values);
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
              <Row className="w-100">
                <Col sm={12}>
                  <H2Purple>{date}</H2Purple>
                </Col>
              </Row>
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
