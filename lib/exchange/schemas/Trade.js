// @flow
import BigNumber from "bignumber.js";

import type { BuyOrSell } from "./BuyOrSell";

/**
 * An executed trade == a taken order
 */
export type Trade = {
  maker: string,
  taker: string,
  timeStamp: Date,
  price: BigNumber,
  type: BuyOrSell,
  quantity: BigNumber,
};
