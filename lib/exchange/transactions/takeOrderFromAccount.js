// @flow
import setup from "../../utils/setup";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import sendTransaction from "../../utils/parity/sendTransaction";
import getOrder from "../calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel an order by `id`
 */
const takeOrderFromAccount = (
  id: number,
  maxTakeAmount: BigNumber,
  wallet,
  from: string = setup.defaultAccount,
): Promise<any> =>
  getOrder(id).then(async order => {
    const simpleMarketContract = await getSimpleMarketContract();

    const args = [order.id, toProcessable(maxTakeAmount, order.sell.symbol)];

    const transaction = await sendTransaction(
      simpleMarketContract,
      "take",
      args,
      wallet,
    );

    const takeLog = findEventInLog("LogTake", transaction);
    const takeOrder = await getOrder(takeLog.params.id.value);

    return transaction
      ? {
          order: takeOrder,
        }
      : null;
  });

export default takeOrderFromAccount;
