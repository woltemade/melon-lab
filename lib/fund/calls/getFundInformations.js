// @flow
import setup from "../../utils/setup";
import getFundContract from "../contracts/getFundContract";
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
  const fundContract = getFundContract(fundAddress);
  const name = await fundContract.instance.getName.call();
  const decimals = (await fundContract.instance.getDecimals.call()).toNumber();
  const creationDate = await fundContract.instance.getCreationTime.call();

  return {
    fundAddress,
    name,
    decimals,
    creationDate: new Date(creationDate.times(1000).toNumber()),
  };
};

export default getFundInformations;
