// @flow
import tokenInfo from "./tokenInfo";

import type { Address } from "../schemas/Address";
import type { TokenSymbol } from "../schemas/TokenSymbol";

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
const getSymbol = (address: Address): TokenSymbol =>
  getTokenInfoByAddress(address).symbol;

export default getSymbol;
