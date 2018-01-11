// @flow
import BigNumber from "bignumber.js";

import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getAddress from "../../assets/utils/getAddress";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
import getFundContract from "../contracts/getFundContract";
import getOrder from "../../exchange/calls/getOrder";
import isTakePermitted from "../../riskManagement/calls/isTakePermitted";
import sendTransaction from "../../utils/parity/sendTransaction";
import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import type { Address } from "../../assets/schemas/Address";

/**
 * Take the order specified by id.
 * @param quantityAsked - The quantity to take from the order. If higher
 *    than the quantity of the order, the order gets executed completely and
 *    the remaining quantity is return.
 */
const takeOrder = (
  wallet,
  id: number,
  fundAddress: Address,
  quantityAsked: BigNumber,
): Promise<any> =>
  getOrder(id).then(async order => {
    const fundContract = await getFundContract(fundAddress);

    const isShutDown = await fundContract.instance.isShutDown.call();
    ensure(isShutDown === false, "Fund is shut down");

    const owner = await fundContract.instance.owner.call();
    ensure(
      owner.toLowerCase() === wallet.address.toLowerCase(),
      "Not owner of fund",
    );

    const isAllowed = await isTakePermitted(id);
    ensure(isAllowed, "Risk Management module does not allow this trade.");

    const datafeedContract = await getDataFeedContract();
    const isDataValid = await datafeedContract.instance.existsData.call({}, [
      getAddress(order.buy.symbol),
      getAddress(order.sell.symbol),
    ]);
    ensure(isDataValid, "Pricefeed data is outdated :( Please try again.");

    // if no quantity specified OR a a specified quantity greater than the selling quantity of the
    // order, execute the full order. Otherwise, execute quantityAsked of the full order.
    const quantity =
      !quantityAsked || quantityAsked.gte(order.sell.howMuch)
        ? order.sell.howMuch
        : quantityAsked;

    const args = [order.id, toProcessable(quantity, order.sell.symbol)];

    const transaction = await sendTransaction(
      fundContract,
      "takeOrder",
      args,
      wallet,
    );

    const updateLog = findEventInLog("OrderUpdated", transaction);
    const updatedOrder = await getOrder(updateLog.params.id.value);

    return transaction
      ? {
          executedQuantity: quantity,
          order: updatedOrder,
        }
      : null;
  });

export default takeOrder;
