import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text, withKnobs } from "@storybook/addon-knobs";

import InsufficentFunds from "./InsufficentFunds";

storiesOf("InsufficentFunds", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <InsufficentFunds
        mlnBalance={text("mlnBalance", "1.2345")}
        ethBalance={text("ethBalance", "2.3456")}
      />
    )),
  );
