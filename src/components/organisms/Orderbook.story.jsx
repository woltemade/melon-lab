import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { object, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Orderbook from "./Orderbook";

const mockedOrderbook = {
  buy: [
    {
      id: 1,
      cumulativeVolume: "1.0000",
      howMuch: "1.0000",
      price: "0.1700",
    },
    {
      id: 2,
      cumulativeVolume: "2.0000",
      howMuch: "1.0000",
      price: "0.1800",
    },
    {
      id: 3,
      cumulativeVolume: "3.0000",
      howMuch: "1.0000",
      price: "0.1900",
    },
  ],
  sell: [
    {
      id: 4,
      cumulativeVolume: "1.0000",
      howMuch: "1.0000",
      price: "0.2000",
    },
    {
      id: 5,
      cumulativeVolume: "2.0000",
      howMuch: "1.0000",
      price: "0.2100",
    },
    {
      id: 6,
      cumulativeVolume: "3.0000",
      howMuch: "1.0000",
      price: "0.2200",
    },
  ],
};

storiesOf("Orderbook", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Orderbook
        sellSymbol={text("sellSymbol", "MLN-T")}
        buySymbol={text("buySymbol", "ETH-T")}
        buyOrders={object("buyOrders", mockedOrderbook.buy)}
        sellOrders={object("sellOrders", mockedOrderbook.sell)}
        totalBuyVolume={text("totalBuyVolume", "3.0000")}
        totalSellVolume={text("totalSellVolume", "3.0000")}
        takeOrder={action("takeOrder")}
      />
    )),
  );
