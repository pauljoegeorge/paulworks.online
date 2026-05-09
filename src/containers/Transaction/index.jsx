import React, { useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
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
  const formRef = useRef(null);
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { actions } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const initialValues = {
    expenses: {
      category_uid: fixedExpenseCategories[0]?.uid,
      amount: 0,
      transaction_date: currentDate(),
    },
  };
  const fixedExpenseOptions = Object.keys(fixedExpenseCategories).map((ind) => ({
    value: fixedExpenseCategories[ind].uid,
    label: fixedExpenseCategories[ind].name,
  }));

  useEffect(() => {
    budgetActions.getExpenseCategories(currentMonth);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    actions.createExpense({ ...values, expenses: { ...values.expenses, latitude, longitude } });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form }) => {
        const { pristine, valid } = form.getState();
        formRef.current = form;
        return (
          <form onSubmit={formHandleSubmit}>
            <CentralDiv className="text-center">
              <div className="w-full mb-12 text-center">
                <H1>New Transaction</H1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 w-full">
                <Field name="expenses.category_uid" component={InputSelect} options={fixedExpenseOptions} label="Category" />
                <Field name="expenses.amount" label="Amount" component={Input} validate={number} />
                <Field name="expenses.transaction_date" label="Date" type="date" component={Input} />
                <Field name="expenses.notes" label="Notes" component={Input} />
              </div>
              <div className="flex justify-center mt-4 w-full">
                <PrimaryButton size="lg" className="w-50" type="submit" disabled={pristine || !valid}>
                  Save
                </PrimaryButton>
              </div>
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default TransactionsContainer;
