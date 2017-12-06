import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Administration from "./Administration";

storiesOf("Administration", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Fund administration panel")(() => (
      <Administration
        loading={boolean("loading", false)}
        subscriptionAllowed={boolean("subscriptionAllowed", false)}
        redemptionAllowed={boolean("redemptionAllowed", false)}
        toggleRedemption={action("toggleRedemption")}
        toggleSubscription={action("toggleSubscription")}
        convertUnclaimedRewards={action("convertUnclaimedRewards")}
        shutdown={action("shutdown")}
      />
    )),
  );
