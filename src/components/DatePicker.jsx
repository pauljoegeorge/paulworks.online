import React from "react";
import PropTypes from "prop-types";
import { FormGroup, FormLabel } from "react-bootstrap";

function DatePicker({ input, meta, label }) {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        {...input}
        selected={input.value || null}
        onChange={(date) => input.onChange(date)}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </FormGroup>
  );
}
DatePicker.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};

export default DatePicker;
