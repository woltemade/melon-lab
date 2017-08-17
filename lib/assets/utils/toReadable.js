// @flow
import BigNumber from "bignumber.js";

import getDecimals from "./getDecimals";

/**
 * Takes a quantity (number) from the EVM and makes it human readable
 * according to the specified token decimals.
 *
 * Note that the EVM always consumes and returns BigNumbers.
 *
 * Eg: toReadable(new BigNumber(100000000000000000, 'ETH-T')) // (17 zeros)
 * --> // BigNumber(0.1)
 *
 * @param {BigNumber} quantity number coming from EVM without precision.
 * @param {string} symbol the symbol of the asset. Eg "MLN-T"
 * @returns {BigNumber}
 */
const toReadable = (quantity: BigNumber, symbol: string = "ETH-T") => {
  const decimals = getDecimals(symbol);
  return new BigNumber(quantity).div(10 ** decimals);
};

export default toReadable;
