// @flow
import setup from "../../utils/setup";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/ensure";
import sendTransaction from "../../utils/sendTransaction";

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

  const receipt = await sendTransaction(fundContract, "shutDown", []);

  return receipt;
};

export default shutDownFund;
