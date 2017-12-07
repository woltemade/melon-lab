// @flow
import setup from "../../utils/setup";
import rush from "../../utils/rush";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import findEventInLog from "../../utils/findEventInLog";
import sendTransaction from "../../utils/sendTransaction";
import gasBoost from "../../utils/gasBoost";
import getOrder from "../calls/getOrder";

import type { Address } from "../../assets/schemas/Address";

/**
 * Cancel an order by `id`
 */
const takeOrderFromAccount = (
  id: number,
  maxTakeAmount: BigNumber,
  from: string = setup.defaultAccount,
): Promise<any> =>
  getOrder(id).then(async order => {
    const simpleMarketContract = await getSimpleMarketContract();

    const args = [order.id, toProcessable(maxTakeAmount, order.sell.symbol)];

    const transaction = await sendTransaction(
      simpleMarketContract,
      "take",
      args,
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
