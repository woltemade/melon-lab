// @flow
import setup from "../../utils/setup";
import rush from "../../utils/generic/rush";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import gasBoost from "../../utils/ethereum/gasBoost";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel an order by `id`
 */
const cancelOrder = async (
  id: number,
  from: Address = setup.defaultAccount,
): boolean => {
  const simpleMarketContract = await getSimpleMarketContract();
  const boosted = gasBoost(simpleMarketContract.cancel, [id], { from });
  const receipt = await rush(
    boosted,
    `Cancelling order ${id} took more than 10 seconds.`,
    10 * 1000,
  );

  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrder;
