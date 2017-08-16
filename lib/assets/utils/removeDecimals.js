// @flow
import BigNumber from "bignumber.js";

import getDecimals from "./getDecimals";

const removeDecimals = (quantity: BigNumber, symbol: String = "ETH-T") => {
  const precision = getDecimals(symbol);
  return quantity.times(10 ** precision);
};

export default removeDecimals;
