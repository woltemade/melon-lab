import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TradeHelper from "./TradeHelper";

storiesOf("TradeHelper", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <TradeHelper
        quoteSymbol={text("quoteSymbol", "MLN-T")}
        baseSymbol={text("baseSymbol", "ETH-T")}
        last={text("last", "0.1234")}
        bid={text("bid", "0.1230")}
        ask={text("ask", "0.1240")}
        setPrice={action("setPrice")}
        setQuantity={action("setQuantity")}
        setTotal={action("setTotal")}
        baseBalance={text("baseBalance", "123.2345")}
        quoteBalance={text("quoteBalance", "234.1245")}
      />
    )),
  );
