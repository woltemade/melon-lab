import React from "react";
import { storiesOf } from "@storybook/react";

import Administration from "./Administration";

storiesOf("Administration", module)
  .add("Default", () => <Administration />)
  .add("loading", () => <Administration loading />)
  .add("subscriptionAllowed", () => <Administration subscriptionAllowed />)
  .add("redemptionAllowed", () => <Administration redemptionAllowed />);
