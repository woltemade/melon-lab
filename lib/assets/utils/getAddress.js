// @flow
import getTokenInfo from './getTokenInfo';

import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Gets address of given `tokenSymbol`
 */
const getAddress = (tokenSymbol: TokenSymbol): Address =>
  getTokenInfo(tokenSymbol).address.toLowerCase();

export default getAddress;
