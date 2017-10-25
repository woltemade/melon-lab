// @flow
import getTokenInfo from "./getTokenInfo";

/**
 * Gets address of given `tokenSymbol`
 */
const getAddress = (tokenSymbol: string): string =>
  getTokenInfo(tokenSymbol).address.toLowerCase();

export default getAddress;
