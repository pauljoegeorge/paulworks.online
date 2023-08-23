import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import { CustomRow as Row } from "../../components/Table";
import { PrimaryButton } from "../../components/Button";
import { H1 } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import Input from "../../components/Input";
import InputSelect from "../../components/InputSelect";
import { useValidations } from "../../utils/validation";
import { getBeginningOfMonth, currentDate } from "../../utils/date";

function TransactionsContainer() {
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const { actions } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const initialValues = {
    expenses: {
      category_uid: fixedExpenseCategories[0]?.uid,
      amount: 0,
      transaction_date: currentDate(),
    },
  };
  const fixedExpenseOptions = Object.keys(fixedExpenseCategories).map(
    (ind) => ({
      value: fixedExpenseCategories[ind].uid,
      label: fixedExpenseCategories[ind].name,
    })
  );

  useEffect(() => {
    budgetActions.getExpenseCategories(currentMonth);
  }, []);

  useEffect(() => {}, []);

  const handleSubmit = (values) => {
    actions.createExpense(values);
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
                  <H1>New Transaction</H1>
                </Col>
              </Row>
              <>
                <Row className="mt-3 w-100 justify-content-center text-center">
                  <Col xs={12} md={6} lg={4}>
                    <Field
                      name="expenses.category_uid"
                      component={InputSelect}
                      options={fixedExpenseOptions}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Field
                      name="expenses.amount"
                      label="Amount"
                      component={Input}
                      validate={number}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Field
                      name="expenses.transaction_date"
                      label="Date"
                      type="date"
                      component={Input}
                    />
                  </Col>
                </Row>
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

export default TransactionsContainer;
