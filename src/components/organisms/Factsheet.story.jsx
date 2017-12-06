import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import CenteredCardDecorator from "../../../tests/storybook/CenteredCardDecorator";

import Factsheet from "./Factsheet";

storiesOf("Factsheet", module)
  .addDecorator(CenteredCardDecorator)
  .add(
    "Default",
    withInfo("Displays the Factsheet of a fund")(() => (
      <Factsheet
        creationDate="1. Dec 2017 12:12"
        aum="12.1234"
        name="Storybook Fund"
        managementReward="0.0000"
        performanceReward="0.0000"
        sharePrice="1.0000"
        totalSupply="1.0000"
      />
    )),
  );
