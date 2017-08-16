// @flow
import BigNumber from "bignumber.js";

import getDecimalsBySymbol from "./getDecimalsBySymbol";

const addDecimals = (quantity: BigNumber, symbol: string) => {
  const decimals = getDecimalsBySymbol(symbol);
  return quantity.div(10 ** decimals);
};

export default addDecimals;
