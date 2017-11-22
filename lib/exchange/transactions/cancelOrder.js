// @flow
import setup from "../../utils/setup";
import rush from "../../utils/rush";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/findEventInLog";
import sendTransaction from "../../utils/sendTransaction";
import gasBoost from "../../utils/gasBoost";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel an order by `id`
 */
const cancelOrder = async (
  id: number,
  from: Address = setup.defaultAccount,
): boolean => {
  const simpleMarketContract = await getSimpleMarketContract();

  // TODO: reintroduce rush
  // const receipt = await rush(
  //   boosted,
  //   `Cancelling order ${id} took more than 10 seconds.`,
  //   10 * 1000,
  // );
  const receipt = await sendTransaction(simpleMarketContract, "cancel", [id]);
  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrder;
