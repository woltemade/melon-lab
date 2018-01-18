// @flow
import BigNumber from 'bignumber.js';

import getDecimals from './getDecimals';

import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Takes a human readable `quantity` and makes it processable by EVM according
 * to the decimals specified by `tokenSymbol`.
 *
 * _Note_ that the EVM always consumes and returns BigNumbers.
 *
 * @example
 *  toProcessable(0.1, 'ETH-T'));
 *  // --> BigNumber(100000000000000000) // (17 zeros)
 */
const toProcessable = (
  quantity: number | BigNumber,
  tokenSymbol: TokenSymbol = 'ETH-T',
): BigNumber => {
  const precision: number = getDecimals(tokenSymbol);
  const roundedQuantity = new BigNumber(quantity).round(precision);
  return new BigNumber(roundedQuantity).times(10 ** precision);
};

export default toProcessable;
