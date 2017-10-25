// @flow
import getTokenInfo from "./getTokenInfo";

/**
 * Gets decimals of given `tokenSymbol`
 */
const getDecimals = (tokenSymbol: string): number =>
  getTokenInfo(tokenSymbol).decimals;

export default getDecimals;
