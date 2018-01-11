// @flow
import setup from "../../utils/setup";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel an order by `id`
 */
const cancelOrderFromAccount = async (wallet, id: number): boolean => {
  const simpleMarketContract = await getSimpleMarketContract();

  // TODO: reintroduce rush
  // const receipt = await rush(
  //   boosted,
  //   `Cancelling order ${id} took more than 10 seconds.`,
  //   10 * 1000,
  // );
  const receipt = await sendTransaction(
    simpleMarketContract,
    "cancel",
    [id],
    wallet,
    {},
    wallet.address,
  );
  const canceled = findEventInLog(
    "LogKill",
    receipt,
    "Error during order cancelation",
  );

  return !!canceled;
};

export default cancelOrderFromAccount;
