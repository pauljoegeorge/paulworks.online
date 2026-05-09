import React, { useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
import { PrimaryButton } from "../../components/Button";
import { CentralDiv } from "../../components/Div";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import TextArea from "../../components/TextArea";

function AutoTransactionContainer() {
  const formRef = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { actions } = useExpenses([]);
  const initialValues = {
    expenses: {
      notes: "",
    },
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    const valuesWithLocation = {
      ...values,
      expenses: {
        ...values.expenses,
        latitude,
        longitude,
      },
    };
    actions.creatAutoeExpense(valuesWithLocation);
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
              <div className="flex justify-center mt-4 w-full">
                <div className="w-full max-w-lg">
                  <Field
                    name="expenses.notes"
                    label="Expense"
                    placeholder="Input「KFC 1000」"
                    component={TextArea}
                    rows={6}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4 w-full">
                <PrimaryButton
                  size="lg"
                  type="submit"
                  disabled={pristine || !valid}
                >
                  Save Transaction
                </PrimaryButton>
              </div>
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default AutoTransactionContainer;
