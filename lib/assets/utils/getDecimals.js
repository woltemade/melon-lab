// @flow
import getTokenInfo from "./getTokenInfo";

import type { TokenSymbol } from "../schemas/TokenSymbol";

/**
 * Gets decimals of given `tokenSymbol`
 */
const getDecimals = (tokenSymbol: TokenSymbol): number =>
  getTokenInfo(tokenSymbol).decimals;

export default getDecimals;
