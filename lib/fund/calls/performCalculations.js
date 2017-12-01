// @flow
import getFundContract from "../contracts/getFundContract";

import type { Address } from "../../assets/schemas/Address";

const performCalculations = async (
  fundAddress: Address,
  precision: number = 18,
) => {
  const fundContract = getFundContract(fundAddress);

  const calculations = await fundContract.instance.performCalculations.call();
  const totalSupply = await fundContract.instance.totalSupply.call();
  console.log(calculations);
  return {
    gav: calculations[0].div(10 ** precision),
    managementReward: calculations[1].div(10 ** precision),
    performanceReward: calculations[2].div(10 ** precision),
    unclaimedRewards: calculations[3].div(10 ** precision),
    nav: calculations[4].div(10 ** precision),
    sharePrice: calculations[5].div(10 ** precision),
    totalSupply: totalSupply.div(10 ** precision),
  };
};

export default performCalculations;
