// @flow
import setup from "../../utils/setup";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import gasBoost from "../../utils/ethereum/gasBoost";
import getFundContract from "../contracts/getFundContract";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel the order with `id` from fund at `fundAddress`
 */
const cancelOrderFromFund = async (
  id: number,
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);

  const receipt = await gasBoost(fundContract.cancel, [id], { from });

  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrderFromFund;
