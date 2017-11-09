// @flow
import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

const getStake = async (fundAddress: Address): Promise<BigNumber> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const stake = await fundContract.getStake();

  return stake;
};

export default getStake;
