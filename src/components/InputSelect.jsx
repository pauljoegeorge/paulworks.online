import React from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FlexContainer, FlexChild } from "./Div";

function InputSelect({ input, label, options, isMultiLabeled }) {
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
        {isMultiLabeled &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <FlexContainer align="flex-start" width="100%">
                <FlexChild align="left" width="100%">
                  {option.label[0]}
                </FlexChild>
                <FlexChild>{option.label[1]}</FlexChild>
              </FlexContainer>
            </MenuItem>
          ))}
        {!isMultiLabeled &&
          options.map((option) => (
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
  isMultiLabeled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

InputSelect.defaultProps = {
  isMultiLabeled: false,
};

export default InputSelect;
