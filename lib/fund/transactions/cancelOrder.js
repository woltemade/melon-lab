// @flow
import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getFundContract from "../contracts/getFundContract";
import sendTransaction from "../../utils/parity/sendTransaction";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel the order with `id` from fund at `fundAddress`
 */
const cancelOrder = async (
  wallet,
  id: number,
  fundAddress: Address,
): Promise<boolean> => {
  const fundContract = await getFundContract(fundAddress);
  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, "Fund is shut down");
  const owner = await fundContract.owner();
  ensure(
    owner.toLowerCase() === wallet.address.toLowerCase(),
    "Not owner of fund",
  );
  const receipt = await sendTransaction(
    fundContract,
    "cancelOrder",
    [id],
    wallet,
  );
  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrder;
