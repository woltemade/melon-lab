// @flow
import getFundContract from '../contracts/getFundContract';
import type { Address } from '../../assets/schemas/Address';

/**
 * General fund informations
 */
type FundInformations = {
  fundAddress: Address,
  owner: Address,
  name: string,
  decimals: number,
  inception: Date,
};

/**
 * Get general fund informations for fund at `fundAddress`
 */
const getFundInformations = async (
  environment,
  { fundAddress },
): Promise<FundInformations> => {
  const fundContract = getFundContract(environment, fundAddress);
  const name = await fundContract.instance.getName.call();
  const decimals = (await fundContract.instance.getDecimals.call()).toNumber();
  const inception = await fundContract.instance.getCreationTime.call();
  const owner = await fundContract.instance.owner.call();
  const modules = await fundContract.instance.getModules.call();

  return {
    fundAddress,
    name,
    owner,
    decimals,
    inception: new Date(inception.times(1000).toNumber()),
    modules,
  };
};

export default getFundInformations;
