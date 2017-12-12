import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { object, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import GetStarted from "./GetStarted";

const mockGetStarted = [];

storiesOf("GetStarted", module).add(
  "Default",
  withInfo("Short info about organism")(() => <GetStarted />),
);
