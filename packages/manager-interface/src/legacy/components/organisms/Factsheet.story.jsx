import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text, withKnobs } from "@storybook/addon-knobs";
import CenteredCardDecorator from "../../../tests/storybook/decorators/CenteredCard";

import Factsheet from "./Factsheet";

storiesOf("Factsheet", module)
  .addDecorator(withKnobs)
  .addDecorator(CenteredCardDecorator)
  .add(
    "Default",
    withInfo("Displays the Factsheet of a fund")(() => (
      <Factsheet
        creationDate={text("creationDate", "1. Dec 2017 12:12")}
        aum={text("aum", "12.1234")}
        name={text("name", "Storybook Fund")}
        managementReward={text("managementReward", "0.0000")}
        performanceReward={text("performanceReward", "0.0000")}
        sharePrice={text("sharePrice", "1.0000")}
        totalSupply={text("totalSupply", "1.0000")}
      />
    )),
  );
