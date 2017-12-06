import React from "react";
import { storiesOf } from "@storybook/react";

import { Container } from "semantic-ui-react";
import ExecuteRequest from "./ExecuteRequest";

console.log(module);
storiesOf("ExecuteRequest", module).add("Default", () => (
  <Container>
    <ExecuteRequest />
  </Container>
));
