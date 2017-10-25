// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * General fund informations
 */
type FundInformations = {
  fundAddress: Address,
  name: string,
  decimals: number,
  creationDate: Date,
};

/**
 * Get general fund informations for fund at `fundAddress`
 */
const getFundInformations = async (
  fundAddress: Address,
): Promise<FundInformations> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const name = await fundContract.getName();
  const decimals = await fundContract.getDecimals().toNumber();
  const creationDate = await fundContract.getCreationTime();

  return {
    fundAddress,
    name,
    decimals,
    creationDate: new Date(creationDate.times(1000).toNumber()),
  };
};

export default getFundInformations;
