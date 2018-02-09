// @flow
import BigNumber from 'bignumber.js';

import setup from '../../utils/setup';
import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../../assets/schemas/Address';

type RewardsConverted = {
  timestamp: BigNumber,
  shareQuantity: BigNumber,
  unclaimedRewards: BigNumber,
};

/**
 * Convert unclaimed rewards of `fundAddress`
 */
const convertUnclaimedRewards = async (
  environment,
  { fundAddress },
): Promise<RewardsConverted> => {
  const fundContract = await getFundContract(environment, fundAddress);
  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');
  const owner = await fundContract.owner();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const receipt = await sendTransaction(
    fundContract,
    'convertUnclaimedRewards',
    [],
    environment,
  );

  const updateLog = findEventInLog('RewardsConverted', receipt);
  const rewardsConvertedArgs = updateLog.params;

  return {
    date: new Date(rewardsConvertedArgs.timestamp.value.times(1000).toNumber()),
    shareQuantity: rewardsConvertedArgs.shareQuantity.value,
    unclaimedRewards: rewardsConvertedArgs.unclaimedRewards.value,
  };
};

export default convertUnclaimedRewards;
