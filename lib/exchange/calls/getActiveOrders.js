import { range } from "ramda";
import BigNumber from "bignumber.js";
import getOrder from "./getOrder";
import getPrices from "../utils/getPrices";
import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";
import getConfig from "../../version/calls/getConfig";
/*
  @ returns an array of active orders for the specified asset pair
*/
const getActiveOrders = async (
  baseTokenSymbol,
  quoteTokenSymbol,
  numberOfOrders = 105,
) => {
  const exchangeAdapterContract = await getExchangeAdapterContract();
  const config = await getConfig();

  const lastId = await exchangeAdapterContract.getLastOrderId(
    config.exchangeAddress,
  );
  const endIndex =
    lastId.minus(numberOfOrders).toNumber() < 0
      ? 1
      : lastId.minus(numberOfOrders).toNumber();
  const getOrdersPromises = range(endIndex, lastId.toNumber()).map(async id => {
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

  const rawOrderbook = await Promise.all(getOrdersPromises);
  const activeOrders = rawOrderbook.filter(o => !!o).sort((a, b) => {
    if (a.type === b.type) return b.price.minus(a.price).toNumber();
    return a.type === "buy" ? 1 : -1;
  });

  return activeOrders;
};

export default getActiveOrders;
