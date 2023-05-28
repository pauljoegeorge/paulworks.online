import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";

const Span = styled.span`
  text-align: left;
  color: #be1010;
`;
function Input({ input, meta, placeholder }) {
  return (
    <>
      <InputGroup className="mb-1 w-75">
        <InputGroup.Text id="basic-addon1">Overall</InputGroup.Text>
        <BootstrapForm.Control
          {...input}
          placeholder={placeholder || "$Expense"}
          aria-label="Expense"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      {meta.error && meta.touched && (
        <Span className="mb-3 w-75">{meta.error}</Span>
      )}
    </>
  );
}

Input.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "$Expenser",
};

export default Input;
