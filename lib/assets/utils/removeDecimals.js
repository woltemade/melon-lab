// @flow
import BigNumber from "bignumber.js";

import getDecimalsBySymbol from "./getDecimalsBySymbol";

const removeDecimals = (quantity: BigNumber, symbol: String) => {
  const precision = getDecimalsBySymbol(symbol);
  return quantity.times(10 ** precision);
};

export default removeDecimals;
