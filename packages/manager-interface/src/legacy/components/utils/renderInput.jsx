import React from "react";

import { Input } from "semantic-ui-react";

const renderInput = ({
  input,
  placeholder,
  type,
  disabled,
  label,
  id,
  style,
  className,
}) => (
  <Input
    {...input}
    {...{ type, label, disabled, id, className }}
    placeholder={placeholder || input.name}
    style={{ width: "100%", ...style }}
  />
);

export default renderInput;
