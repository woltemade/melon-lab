// @flow
import setup from "../../utils/setup";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getFundContract from "../contracts/getFundContract";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel the order with `id` from fund at `fundAddress`
 */
const cancelOrder = async (
  id: number,
  fundAddress: Address,
  from: Address = setup.defaultAccount,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);

  const receipt = await sendTransaction(fundContract, "cancel", [id], {}, from);
  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrder;
