// @flow
import BigNumber from 'bignumber.js';

import getDecimals from './getDecimals';

import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Takes a `quantity` from the EVM and makes it human readable
 * according to the decimals specified by `tokenSymbol`.
 *
 * _Note_ that the EVM always consumes and returns BigNumbers.
 *
 * @example toReadable(new BigNumber(100000000000000000, 'ETH-T')) // (17 zeros)
 * // --> // BigNumber(0.1)
 */
const toReadable = (
  quantity: BigNumber,
  tokenSymbol: TokenSymbol = 'ETH-T',
): BigNumber => {
  const decimals: number = getDecimals(tokenSymbol);
  return new BigNumber(quantity).div(10 ** decimals);
};

export default toReadable;
