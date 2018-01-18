// @flow
import Api from '@parity/api';

import TokenAbi from '@melonproject/protocol/out/assets/Asset.abi.json';
import setup from '../../utils/setup';
import getAddress from '../utils/getAddress';

import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * @returns the contract instance of a token by symbol
 */
const getTokenContract: contract = async (symbol: TokenSymbol) => {
  const tokenAddress = getAddress(symbol);
  const api = new Api(setup.provider);
  return api.newContract(TokenAbi, tokenAddress);
};

export default getTokenContract;
