import React from "react";

import { Input } from "semantic-ui-react";

const renderInput = ({ input, placeholder }) => (
  <Input
    {...input}
    placeholder={placeholder || input.name}
    style={{ width: "100%" }}
  />
);

export default renderInput;
