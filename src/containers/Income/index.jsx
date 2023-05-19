import React, { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import moment from "moment";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import Notify from "../../components/Notify";
import { isMobile } from "../../utils/utils";

function IncomeContainer() {
  const [showAlert, setShowAlert] = useState(false);
  const mobile = isMobile();
  const date = moment().format("MMMM YYYY");

  const handleUpdate = () => {
    setShowAlert(true);
    // perform other update actions here
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <CentralDiv className="justify-content-center text-center">
      {showAlert && (
        <Notify
          variant="success"
          message="Updated fixed expense"
          onClose={handleClose}
        />
      )}
      <Row className="w-100 mb-5">
        <Col sm={12}>
          <H1>Income</H1>
        </Col>
      </Row>
      <Row className="w-100">
        <Col sm={12}>
          <H2Purple>{date}</H2Purple>
        </Col>
      </Row>
      <Row className="mt-3 w-100 justify-content-center text-center">
        <InputGroup className={mobile ? "mb-3 w-75" : "mb-3 w-75"}>
          <InputGroup.Text id="basic-addon1">Income</InputGroup.Text>
          <Form.Control
            placeholder="$$$"
            aria-label="Expense"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Row>
      <Row className="mt-3 w-100 justify-content-center text-center">
        <PrimaryButton
          variant="primary"
          size="lg"
          className="w-50"
          onClick={handleUpdate}
        >
          Update Income
        </PrimaryButton>
      </Row>
    </CentralDiv>
  );
}

export default IncomeContainer;
