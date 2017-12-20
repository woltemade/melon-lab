// @flow
import setup from "../../utils/setup";
import getFundContract from "../contracts/getFundContract";
import ensure from "../../utils/generic/ensure";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

/**
 * Shut down fund at `fundAddress`
 */
const shutDownFund = async (
  fundAddress: Address,
  wallet,
  from: Address = setup.defaultAccount,
): Promise<any> => {
  const fundContract = await getFundContract(fundAddress);
  const owner = await fundContract.owner();
  ensure(owner === from, "Not owner of fund");

  const receipt = await sendTransaction(fundContract, "shutDown", [], wallet);

  return receipt;
};

export default shutDownFund;
