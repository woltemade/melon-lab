import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Modal from "./Modal";

storiesOf("Modal", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Modal prop={boolean("prop", false)} onAction={action("onAction")} />
    ))
  );
