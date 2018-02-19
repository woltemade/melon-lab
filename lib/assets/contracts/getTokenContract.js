// @flow
import TokenAbi from '@melonproject/protocol/out/assets/PreminedAsset.abi.json';
import getAddress from '../utils/getAddress';

import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * @returns the contract instance of a token by symbol
 */
const getTokenContract: contract = async (environment, symbol) => {
  const tokenAddress = getAddress(symbol);
  return environment.api.newContract(TokenAbi, tokenAddress);
};

export default getTokenContract;
