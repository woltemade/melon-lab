// @flow
import BigNumber from 'bignumber.js';
import getFundContract from '../../fund/contracts/getFundContract';
import toReadable from '../../assets/utils/toReadable';

import type { Address } from '../../assets/schemas/Address';

/**
 * The participation of an investor in fund
 */
type Participation = {
  personalStake: BigNumber,
  totalSupply: BigNumber,
};

/**
 * Get the personalStake and totalSupply of an `investorAddress` in a fund at
 * fundAddress
 */
const getParticipation = async (
  environment,
  { fundAddress, investorAddress },
): Promise<Participation> => {
  const fundContract = await getFundContract(environment, fundAddress);

  const personalStake = await fundContract.instance.balanceOf.call({}, [
    investorAddress,
  ]);
  const totalSupply = await fundContract.instance.totalSupply.call();

  return {
    personalStake: toReadable(personalStake),
    totalSupply: toReadable(totalSupply),
  };
};

export default getParticipation;
