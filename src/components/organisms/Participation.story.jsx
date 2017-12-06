import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Participation from "./Participation";

storiesOf("Participation", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Participation
        pendingRequest={boolean("pendingRequest", false)}
        amount={text("amount", "1.2345")}
        loading={boolean("loading", false)}
        onChange={action("onChange")}
        onSelect={action("onSelect")}
        onSubmit={action("onSubmit")}
        participationType={select(
          "participationType",
          { Invest: "Invest", Redeem: "Redeem" },
          "Invest",
        )}
        price={text("price", "1.2345")}
        total={text("total", "1.0000")}
        readyToExecute={boolean("readyToExecute", false)}
        onExecute={action("onExecute")}
        handleFinish={action("handleFinish")}
      />
    )),
  );
