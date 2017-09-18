// @flow
import BigNumber from "bignumber.js";
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import getOrder from "../../exchange/calls/getOrder";

/**
 * Take the order specified by id.
 * @param quantityAsked - The quantity to take from the order. If higher
 *    than the quantity of the order, the order gets executed completely and
 *    the remaining quantity is return.
 */
const takeOrderFromFund = (
  id: number,
  managerAddress: string,
  vaultAddress: string,
  quantityAsked: BigNumber,
) =>
  getOrder(id).then(async order => {
    const Fund = contract(FundJson);

    // if no quantity specified OR a a specified quantity greater than the selling quantity of the
    // order, execute the full order. Otherwise, execute quantityAsked of the full order.
    const quantity =
      !quantityAsked || quantityAsked.gte(order.sell.howMuch)
        ? order.sell.howMuch
        : quantityAsked;

    Fund.setProvider(setup.currentProvider);
    const fundContract = Fund.at(vaultAddress);
    const transaction = await fundContract.takeOrder(
      order.id,
      toProcessable(quantity, order.sell.symbol),
      { from: managerAddress },
    );

    return transaction
      ? {
          executedQuantity: quantity,
          transaction,
        }
      : null;
  });

export default takeOrderFromFund;
