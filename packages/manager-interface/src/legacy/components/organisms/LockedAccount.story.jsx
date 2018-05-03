import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import LockedAccount from "./LockedAccount";

storiesOf("LockedAccount", module).add(
  "Default",
  withInfo("Short info about organism")(() => <LockedAccount />),
);
