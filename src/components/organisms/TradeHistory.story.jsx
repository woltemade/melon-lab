import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text, object, withKnobs } from "@storybook/addon-knobs";

import TradeHistory from "./TradeHistory";

const mockedTrades = [
  {
    id: 1,
    timestamp: "1. Dec 2017 12:12",
    type: "Buy",
    price: "1.0000",
    quantity: "100.0000",
  },
  {
    id: 2,
    timestamp: "1. Dec 2017 12:12",
    type: "Buy",
    price: "1.0000",
    quantity: "100.0000",
  },
  {
    id: 3,
    timestamp: "1. Dec 2017 12:12",
    type: "Buy",
    price: "1.0000",
    quantity: "100.0000",
  },
];

storiesOf("TradeHistory", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <TradeHistory fundRecentTrades={object("recentTrades", mockedTrades)} />
    )),
  );
