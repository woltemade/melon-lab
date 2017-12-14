import React from "react";

import { Input } from "semantic-ui-react";

const renderInput = ({ input, placeholder, type, disabled }) => (
  <Input
    {...input}
    type={type}
    disabled={disabled}
    placeholder={placeholder || input.name}
    style={{ width: "100%" }}
  />
);

export default renderInput;
