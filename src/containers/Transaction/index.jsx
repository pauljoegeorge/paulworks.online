import React, { useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import { CustomRow as Row } from "../../components/Table";
import { PrimaryButton } from "../../components/Button";
import { H1 } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import { useOcr } from "./hooks/useOcr";
import Input from "../../components/Input";
import InputSelect from "../../components/InputSelect";
import { useValidations } from "../../utils/validation";
import { getBeginningOfMonth, currentDate } from "../../utils/date";
import Camera from "../../components/Camera";

function TransactionsContainer() {
  const formRef = useRef(null);
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const { actions } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const { actions: ocrActions, ocrResult } = useOcr();
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
    actions.createExpense(valuesWithLocation);
  };

  useEffect(() => {
    if (ocrResult && formRef.current) {
      formRef.current.change("expenses.notes", ocrResult.merchant_name);
      const totalAmount =
        ocrResult.items?.find((i) => i.description === "合計")?.amount || 0;
      formRef.current.change("expenses.amount", totalAmount);
    }
  }, [ocrResult, formRef]);

  const handleCapture = async (imageSrc) => {
    setPhotoTaken(true);
    await ocrActions.readReceipt(imageSrc);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form }) => {
        const { pristine, valid } = form.getState();
        formRef.current = form;
        return (
          <>
            <form onSubmit={formHandleSubmit}>
              <CentralDiv className="justify-content-center text-center">
                <Row className="w-100 mb-5">
                  <Col sm={12}>
                    <H1>New Transaction</H1>
                  </Col>
                </Row>
                <>
                  <Row className="mt-3 w-100 justify-content-center text-center">
                    <Col xs={12} md={3} lg={3}>
                      <Field
                        name="expenses.category_uid"
                        component={InputSelect}
                        options={fixedExpenseOptions}
                      />
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                      <Field
                        name="expenses.amount"
                        label="Amount"
                        component={Input}
                        validate={number}
                      />
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                      <Field
                        name="expenses.transaction_date"
                        label="Date"
                        type="date"
                        component={Input}
                      />
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                      <Field
                        name="expenses.notes"
                        label="Notes"
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
                {!photoTaken && (
                  <Row className="mt-5 w-100 justify-content-center text-center">
                    <H1>Read Receipt</H1>
                    <Camera onCapture={handleCapture} />
                  </Row>
                )}
              </CentralDiv>
            </form>
          </>
        );
      }}
    />
  );
}

export default TransactionsContainer;
