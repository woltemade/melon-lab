// @flow
import BigNumber from "bignumber.js";

import getDecimals from "./getDecimals";

/**
 * Takes a human readable quantity and makes it processable by EVM according
 * to the specified token decimals.
 *
 * Note that the EVM always consumes and returns BigNumbers.
 *
 * Eg: toProcessable(0.1, 'ETH-T'))
 * --> BigNumber(100000000000000000) // (17 zeros)
 *
 * @param {*} quantity
 * @param {*} symbol
 */
const toProcessable = (
  quantity: number | BigNumber,
  symbol: string = "ETH-T",
) => {
  const precision = getDecimals(symbol);
  return new BigNumber(quantity).times(10 ** precision);
};

export default toProcessable;
