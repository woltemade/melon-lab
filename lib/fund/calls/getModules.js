// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Returns the addresses of all modules linked to the fund at `fundAddress`
 */
const getModules = async (fundAddress: Address): Promise<[Address]> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const modules = await fundContract.getModules();

  return modules;
};

export default getModules;
