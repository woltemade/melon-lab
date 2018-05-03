import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import NumberInput from "./NumberInput";

storiesOf("NumberInput", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <NumberInput
        prop={boolean("prop", false)}
        onAction={action("onAction")}
      />
    )),
  );
