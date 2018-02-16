// @flow
import BigNumber from 'bignumber.js';

import takeOrder from './takeOrder';

import type { Address } from '../../assets/schemas/Address';
import type { Order } from '../../exchange/schemas/Order';

/**
 * Takes multiple orders from fund at `fundAddress` upon to `totalQuantityAsked`
 * @param orders sorted and filtered orders by matchOrders
 */
const takeMultipleOrders = async (
  environment,
  {
    orders,
    managerAddress,
    fundAddress,
    totalQuantityAsked,
    exchangeNumber = 0,
  },
): Promise<BigNumber> =>
  orders.reduce(async (accumulatorPromise: Promise<*>, currentOrder: any) => {
    let remainingQuantity = await accumulatorPromise;

    if (remainingQuantity.gt(0)) {
      const result = await takeOrder(environment, {
        id: currentOrder.id,
        fundAddress,
        quantityAsked: remainingQuantity,
        exchangeNumber,
      });
      remainingQuantity = remainingQuantity.minus(result.executedQuantity);
    }

    return remainingQuantity;
  }, Promise.resolve(new BigNumber(totalQuantityAsked)));

export default takeMultipleOrders;
