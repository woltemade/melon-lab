import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import NoMetamask from "./NoMetamask";

storiesOf("NoMetamask", module).add(
  "Default",
  withInfo("Short info about organism")(() => <NoMetamask />),
);
