// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Checks if fund at `fundAddress` is shutdown
 */
const isShutDown = async (fundAddress: Address): Promise<boolean> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const bool = await fundContract.isShutDown();

  return bool;
};

export default isShutDown;
