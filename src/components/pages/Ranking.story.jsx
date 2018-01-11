import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { object, withKnobs } from "@storybook/addon-knobs";

import Ranking from "./Ranking";

const mockRanking = [
  {
    address: "0xdaA2D3d984c88810aD4591565A56865AAD2211B9",
    name: "test-ncox",
    sharePrice: 1.4,
    inception: "2017-12-01T10:41:32.000Z",
  },
  {
    address: "0xe72031F4B1080489666cACf145F00FEFb18FF663",
    name: "test-stzd",
    sharePrice: 1.1,
    inception: "2017-12-07T14:40:24.000Z",
  },
  {
    address: "0x48280eAC23283478E66D5FBC61112E8Cc3c002A6",
    name: "test-u77s",
    sharePrice: 0.4,
    inception: "2017-11-30T15:06:08.000Z",
  },
];

storiesOf("Ranking", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    withInfo()(() => (
      <Ranking rankingList={object("rankingList", mockRanking)} />
    )),
  );
