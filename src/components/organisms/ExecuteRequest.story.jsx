import React from "react";
import { storiesOf } from "@storybook/react";
import CenteredCardDecorator from "../../../tests/storybook/CenteredCardDecorator";

import ExecuteRequest from "./ExecuteRequest";

storiesOf("ExecuteRequest", module)
  .addDecorator(CenteredCardDecorator)
  .add("Default", () => <ExecuteRequest />);
