import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import FundActivity from "./FundActivity";

storiesOf("FundActivity", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo("Short info about organism")(() => (
      <FundActivity
        requestFullParticipationHistory={action(
          "requestFullParticipationHistory",
        )}
      />
    )),
  );
