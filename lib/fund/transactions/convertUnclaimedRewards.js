// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

type RewardsConverted = {
  timestamp: BigNumber,
  shareQuantity: BigNumber,
  unclaimedRewards: BigNumber,
};

/**
 * Convert unclaimed rewards of `fundAddress`
 */
const convertUnclaimedRewards = async (
  wallet,
  fundAddress: Address,
  from: string = setup.defaultAccount,
): Promise<RewardsConverted> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const receipt = await sendTransaction(
    fundContract,
    "convertUnclaimedRewards",
    [],
    wallet,
  );

  const updateLog = findEventInLog("RewardsConverted", receipt);
  const rewardsConvertedArgs = updateLog.params;

  return {
    date: new Date(rewardsConvertedArgs.timestamp.value.times(1000).toNumber()),
    shareQuantity: rewardsConvertedArgs.shareQuantity.value,
    unclaimedRewards: rewardsConvertedArgs.unclaimedRewards.value,
  };
};

export default convertUnclaimedRewards;
