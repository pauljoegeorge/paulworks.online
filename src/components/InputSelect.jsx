import React from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function InputSelect({ input, label, options }) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${input.name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${input.name}-label`}
        id={input.name}
        value={input.value}
        onChange={input.onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

InputSelect.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default InputSelect;
