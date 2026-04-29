import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";

const Span = styled.span`
  text-align: left;
  color: #be1010;
`;
function Input({ input, meta, placeholder, label }) {
  const showError = meta.touched && meta.error;
  return (
    <>
      {/* <InputGroup className="mb-1 w-75">
        <InputGroup.Text id="basic-addon1">{label || "Overall"}</InputGroup.Text>
        <BootstrapForm.Control
          {...input}
          placeholder={placeholder || "$Expense"}
          aria-label="Expense"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      {meta.error && meta.touched && (
        <Span className="mb-3 w-75">{meta.error}</Span>
      )} */}
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        {...input}
      />
      {showError && <span>{meta.error}</span>}
    </>
  );
}

Input.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "$Expenser",
  label: "Overall",
};

export default Input;
