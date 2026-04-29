import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

const Span = styled.span`
  text-align: left;
  color: #be1010;
`;

function TextArea({ input, meta, placeholder, label, rows }) {
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        multiline
        rows={rows}
        {...input}
      />
      {showError && <Span>{meta.error}</Span>}
    </>
  );
}

TextArea.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  placeholder: "Enter text here...",
  label: "Description",
  rows: 4,
};

export default TextArea;
