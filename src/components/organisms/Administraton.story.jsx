import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";

import Administration from "./Administration";

storiesOf("Administration", module)
  .add(
    "Default",
    withInfo("Fund administration panel")(() => (
      <Administration
        loading={false}
        subscriptionAllowed={false}
        redemptionAllowed={false}
        toggleRedemption={action("toggleRedemption")}
        toggleSubscription={action("toggleSubscription")}
        convertUnclaimedRewards={action("convertUnclaimedRewards")}
        shutdown={action("shutdown")}
      />
    )),
  )
  .add("loading", () => <Administration loading />)
  .add("subscriptionAllowed", () => <Administration subscriptionAllowed />)
  .add("redemptionAllowed", () => <Administration redemptionAllowed />);
