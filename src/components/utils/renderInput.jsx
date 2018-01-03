import React from "react";

import { Input } from "semantic-ui-react";

const renderInput = ({
  input,
  placeholder,
  type,
  disabled,
  label,
  min,
  max,
  step,
  id,
}) => (
  <Input
    {...input}
    type={type}
    min={min}
    max={max}
    label={label}
    disabled={disabled}
    placeholder={placeholder || input.name}
    style={{ width: "100%" }}
    step={step}
    id={id}
  />
);

export default renderInput;
