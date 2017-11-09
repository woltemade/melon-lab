// @flow
import BigNumber from "bignumber.js";
import { range } from "ramda";
import getOrder from "./getOrder";
import getPrices from "../utils/getPrices";
import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";
import getConfig from "../../version/calls/getConfig";

import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";
import type { Order } from "../schemas/Order";

/**
 * Get `numberOfOrders` active orders for the `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair
 */
const getActiveOrders = async (
  baseTokenSymbol: TokenSymbol,
  quoteTokenSymbol: TokenSymbol,
  numberOfOrders: number = 105,
): Promise<[Order]> => {
  const exchangeAdapterContract = await getExchangeAdapterContract();
  const config = await getConfig();

  const lastId: BigNumber = await exchangeAdapterContract.getLastOrderId(
    config.exchangeAddress,
  );
  const endIndex: number =
    lastId.minus(numberOfOrders).toNumber() < 0
      ? 1
      : lastId.minus(numberOfOrders).toNumber();

  const getOrdersPromises: [Promise<Order>] = range(
    endIndex,
    lastId.toNumber(),
  ).map(async id => {
    const order = await getOrder(id);
    const assetPairArray = [baseTokenSymbol, quoteTokenSymbol];
    if (
      order.isActive &&
      (assetPairArray.includes(order.buy.symbol) &&
        assetPairArray.includes(order.sell.symbol))
    ) {
      if (order.buy.symbol === baseTokenSymbol) {
        order.price = getPrices(order).buy;
        order.type = "buy";
      } else {
        order.price = getPrices(order).sell;
        order.type = "sell";
      }
      return order;
    }
    return null;
  });

  const rawOrderbook: [Order] = await Promise.all(getOrdersPromises);
  const activeOrders = rawOrderbook.filter(o => !!o).sort((a, b) => {
    if (a.type === b.type) return b.price.minus(a.price).toNumber();
    return a.type === "buy" ? 1 : -1;
  });

  return activeOrders;
};

export default getActiveOrders;
