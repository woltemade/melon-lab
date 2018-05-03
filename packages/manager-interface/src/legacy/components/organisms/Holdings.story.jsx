import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { object, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Holdings from "./Holdings";

const mockHoldings = [
  {
    symbol: "MLN-T",
    quantity: "10.0000",
    percentage: "50.0000",
    price: "1.0000",
  },
  {
    symbol: "BTC-T",
    quantity: "22.0000",
    percentage: "20.0000",
    price: "100.0000",
  },
  {
    symbol: "ETH-T",
    quantity: "5.0000",
    percentage: "30.0000",
    price: "10.0000",
  },
];

storiesOf("Holdings", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Holdings
        holdings={object("holdings", mockHoldings)}
        selectAsset={action("selectAsset")}
      />
    )),
  );
