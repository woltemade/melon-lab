import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ReduxProvider from "../../../tests/storybook/decorators/ReduxProvider";
import connectForm from "../../../tests/storybook/utils/connectForm";

import Trade from "./Trade";

const Form = connectForm(Trade);

storiesOf("Trade", module)
  .addDecorator(withKnobs)
  .addDecorator(ReduxProvider)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Form
        loading={boolean("loading", false)}
        onSubmit={action("Submit")}
        switchSymbols={action("switchSymbols")}
        orderType={select("orderType", { buy: "buy", sell: "sell" }, "buy")}
        theirOrderType={select(
          "theirOrderType",
          { buy: "buy", sell: "sell" },
          "sell",
        )}
        quoteSymbol={text("quoteSymbol", "MLN-T")}
        baseSymbol={text("baseSymbol", "ETH-T")}
      />
    )),
  );
