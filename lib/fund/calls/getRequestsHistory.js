// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Get all the subscribe/redeem requests this fund at `fundAddress` received so far
 */
const getRequestsHistory = async (fundAddress: Address): Promise<any> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const requests = await fundContract.requests();

  return requests;
};

export default getRequestsHistory;
