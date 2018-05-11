import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, select, withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ReduxProvider from "../../../tests/storybook/decorators/ReduxProvider";
import connectForm from "../../../tests/storybook/utils/connectForm";

import Modal, { types } from "./Modal";

const ModalForm = connectForm(Modal);

storiesOf("Modal", module)
  .addDecorator(withKnobs)
  .addDecorator(ReduxProvider)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <ModalForm
        isOpen={boolean("isOpen", true)}
        type={select("type", types)}
        title={text("title", "Modal title")}
        body={text("body", "Lorem ipsum dolor sit amet!")}
        primaryAction={action("primaryAction")}
        primaryActionText={text("primaryActionText", "Confirm")}
        secondaryAction={action("secondaryAction")}
        secondaryActionText={text("secondaryActionText", "")}
      />
    ))
  );
