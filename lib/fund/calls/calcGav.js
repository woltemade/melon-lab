// @flow
import BigNumber from 'bignumber.js';
import getFundContract from '../contracts/getFundContract';

import type { Address } from '../../assets/schemas/Address';

/**
 * Calculates gross asset value (GAV) of fund at `fundAddress`
 */
const calcGav = async (fundAddress: Address): Promise<BigNumber> => {
  const fundContract = getFundContract(fundAddress);

  const gav = await fundContract.instance.calcGav.call();

  return gav;
};

export default calcGav;
