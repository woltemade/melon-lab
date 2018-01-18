// @flow
import BigNumber from 'bignumber.js';
import getTokenContract from '../contracts/getTokenContract';
import toReadable from '../utils/toReadable';
import setup from '../../utils/setup';

import type { Address } from '../schemas/Address';
import type { TokenSymbol } from '../schemas/TokenSymbol';

/**
 * @returns the balance of a token for an address
 */
const getBalance = async (
  tokenSymbol: TokenSymbol,
  ofAddress: Address = setup.defaultAccount,
): Promise<BigNumber> => {
  const tokenContract = await getTokenContract(tokenSymbol);
  const result = await tokenContract.instance.balanceOf.call({}, [ofAddress]);
  return toReadable(result, tokenSymbol);
};

export default getBalance;
