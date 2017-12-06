import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text, withKnobs } from "@storybook/addon-knobs";

import Statistics from "./Statistics";

storiesOf("Statistics", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Statistics
        rewardsSum={text("rewardsSum", 127)}
        investmentsSum={text("investmentsSum", 1270)}
        redeemalsSum={text("redeemalsSum", 570)}
        tradesCount={text("tradesCount", 1277)}
        highestSharePrice={text("highestSharePrice", "2.170")}
        netAssetValue={text("netAssetValue", 980)}
      />
    )),
  );
