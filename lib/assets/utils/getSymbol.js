// @flow
import tokenInfo from "./tokenInfo";

const getTokenInfoByAddress = (address: string): any =>
  tokenInfo.kovan.find(
    t => t.address.toLowerCase() === address.toLowerCase(),
  ) ||
  (() => {
    throw new Error(`No token found with address ${address}`);
  })();

/**
 * Gets the token symbol by its ERC20 `address`
 */
const getSymbol = (address: string): string =>
  getTokenInfoByAddress(address).symbol;

export default getSymbol;
