// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";
import findEventInLog from "../../utils/findEventInLog";

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
  fundAddress: Address,
  from: string = setup.defaultAccount,
): Promise<RewardsConverted> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const receipt = await gasBoost(fundContract.convertUnclaimedRewards, [], {
    from,
  });

  const updateLog = findEventInLog("RewardsConverted", receipt);
  const rewardsConverted = updateLog.args;
  return rewardsConverted;
};

export default convertUnclaimedRewards;
