import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import NoConnection from "./NoConnection";

storiesOf("NoConnection", module).add(
  "Default",
  withInfo("Short info about organism")(() => <NoConnection />),
);
