import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Col } from "react-bootstrap";
import { useWise } from "./hooks/useWise";
import { CustomRow as Row } from "../../components/Table";
import { PrimaryButton } from "../../components/Button";
import { H1 } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import Input from "../../components/Input";
import { getPastDate, currentDate } from "../../utils/date";
import WiseLogo from "../../assets/wise-logo.png";

function WiseContainer() {
  const { actions, isAllowed } = useWise();
  const initialValues = {
    from: getPastDate(30, "days"),
    to: currentDate(),
  };

  useEffect(() => {
    actions.checkPermission();
  }, []);

  const handleSubmit = (values) => {
    if (isAllowed) {
      actions.saveCardTransactions(values);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit }) => {
        return (
          <form onSubmit={formHandleSubmit}>
            <CentralDiv className="justify-content-center text-center">
              <Row className="mb-5">
                <Col sm={12}>
                  <img src={WiseLogo} height="100px" alt="wise logo" />
                  <H1>Card Transactions</H1>
                  <span>
                    💡Save card transactions to Expenses <br />
                  </span>
                  <span style={{ color: "red" }}>
                    Contact pauljoe.social@gmail.com to link and enable this
                    feature 🙏🏻
                  </span>
                </Col>
              </Row>
              {isAllowed && (
                <>
                  <Row className="mt-3 w-100 justify-content-center text-center">
                    <Col xs={6}>
                      <Field
                        name="from"
                        label="From"
                        type="date"
                        component={Input}
                      />
                    </Col>
                    <Col xs={6}>
                      <Field
                        name="to"
                        label="To"
                        type="date"
                        component={Input}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3 w-100 justify-content-center text-center">
                    <PrimaryButton
                      variant="primary"
                      size="lg"
                      className="w-50"
                      type="submit"
                    >
                      Save to Expenses
                    </PrimaryButton>
                  </Row>
                </>
              )}
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default WiseContainer;
