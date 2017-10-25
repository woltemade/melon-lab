// @flow
import setup from "../../utils/setup";
import gasBoost from "../../utils/gasBoost";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";

import type { Address } from "../../assets/schemas/Address";

/**
 * Shut down fund at `fundAddress`
 */
const shutDownFund = async (
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<any> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const receipt = await gasBoost(fundContract.shutDown, [], {
    from,
  });

  return receipt;
};

export default shutDownFund;
