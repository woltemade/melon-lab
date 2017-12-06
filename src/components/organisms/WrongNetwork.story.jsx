import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import WrongNetwork from "./WrongNetwork";

storiesOf("WrongNetwork", module).add(
  "Default",
  withInfo()(() => <WrongNetwork />),
);
