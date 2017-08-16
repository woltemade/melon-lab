// @flow
import BigNumber from "bignumber.js";

import getDecimals from "./getDecimals";

const addDecimals = (quantity: BigNumber, symbol: string) => {
  const decimals = getDecimals(symbol);
  return quantity.div(10 ** decimals);
};

export default addDecimals;
