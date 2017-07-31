// @flow
import BigNumber from "bignumber.js";

import getDecimalsBySymbol from "./getDecimalsBySymbol";

const removePrecision = (quantity: BigNumber, symbol: String) => {
  const precision = getDecimalsBySymbol(symbol);
  return quantity.times(10 ** precision);
};

export default removePrecision;
