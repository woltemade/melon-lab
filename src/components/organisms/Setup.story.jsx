import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ReduxProvider from "../../../tests/storybook/decorators/ReduxProvider";
import connectForm from "../../../tests/storybook/utils/connectForm";

import Setup from "./Setup";

const Form = connectForm(Setup);

storiesOf("Setup", module)
  .addDecorator(withKnobs)
  .addDecorator(ReduxProvider)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <Form loading={boolean("loading", false)} onSubmit={action("Submit")} />
    )),
  );
