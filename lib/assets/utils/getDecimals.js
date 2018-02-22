// @flow
import getTokenInfo from './getTokenInfo';

import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * Gets decimals of given `tokenSymbol`
 */
const getDecimals = (tokenSymbol: ?TokenSymbol): number =>
  tokenSymbol ? getTokenInfo(tokenSymbol).decimals : 18;

export default getDecimals;
