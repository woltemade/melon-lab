// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";

import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get the contract instance of fund at `fundAddress`
 */
const getFundContract = async (fundAddress: Address): Promise<any> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  return Fund.at(fundAddress);
};

export default getFundContract;
