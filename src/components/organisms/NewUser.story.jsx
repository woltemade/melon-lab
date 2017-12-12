import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { object, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import NewUser from "./NewUser";

const mockNewUser = [];

storiesOf("NewUser", module).add(
  "Default",
  withInfo("Short info about organism")(() => <NewUser />),
);
