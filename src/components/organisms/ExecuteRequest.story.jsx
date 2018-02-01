import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import CenteredCardDecorator from "../../../tests/storybook/decorators/CenteredCard";

import ExecuteRequest from "./ExecuteRequest";

storiesOf("ExecuteRequest", module)
  .addDecorator(withKnobs)
  .addDecorator(CenteredCardDecorator)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <ExecuteRequest
        handleFinish={action("handleFinis")}
        loading={boolean("loading", false)}
        onExecute={action("onExecute")}
        readyToExecute={boolean("readyToExecute", false)}
      />
    )),
  );
