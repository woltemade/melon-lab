import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { ConnectionInfo, statusTypes } from "./ConnectionInfo";

storiesOf("ConnectionInfo", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Displays some important connection/account info concise")(() => (
      <ConnectionInfo
        account={text("account", "0xDeaDBeefbadA55")}
        mlnBalance={(text("mlnBalance"), "1.032424523")}
        ethBalance={(text("ethBalance"), "3.023414")}
        statusMessage={text("statusMessage", "Block overdue")}
        statusType={select("statusType", statusTypes, statusTypes.WARNING)}
        onAction={action("onAction")}
      />
    )),
  );
