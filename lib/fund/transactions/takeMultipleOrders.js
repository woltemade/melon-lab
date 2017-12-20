// @flow
import BigNumber from "bignumber.js";

import takeOrder from "./takeOrder";

import type { Address } from "../../assets/schemas/Address";
import type { Order } from "../../exchange/schemas/Order";

/**
 * Takes multiple orders from fund at `fundAddress` upon to `totalQuantityAsked`
 * @param orders sorted and filtered orders by matchOrders
 */
const takeMultipleOrders = async (
  orders: Array<Order>,
  managerAddress: Address,
  fundAddress: Address,
  totalQuantityAsked: BigNumber,
  wallet,
): Promise<BigNumber> =>
  orders.reduce(async (accumulatorPromise: Promise<*>, currentOrder: any) => {
    let remainingQuantity = await accumulatorPromise;

    if (remainingQuantity.gt(0)) {
      const result = await takeOrder(
        currentOrder.id,
        fundAddress,
        remainingQuantity,
        managerAddress,
        wallet,
      );
      remainingQuantity = remainingQuantity.minus(result.executedQuantity);
    }

    return remainingQuantity;
  }, Promise.resolve(new BigNumber(totalQuantityAsked)));

export default takeMultipleOrders;
