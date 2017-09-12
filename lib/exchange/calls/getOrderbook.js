import { range, mapAccum } from "ramda";
import BigNumber from "bignumber.js";
import getOrder from "./getOrder";
import getPrices from "../utils/getPrices";
import getExchangeContract from "../contracts/getExchangeContract";

/*
  @ returns an array of active orders for the specified asset pair
*/
const getOrderbook = async (baseTokenSymbol, quoteTokenSymbol) => {
  const exchangeContract = await getExchangeContract();

  const lastId = await exchangeContract.getLastOfferId();
  const endIndex =
    lastId.minus(105).toNumber() < 0 ? 1 : lastId.minus(105).toNumber();
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
  const cleanedOrderbook = rawOrderbook.filter(o => !!o).sort((a, b) => {
    if (a.type === b.type) return b.price.minus(a.price).toNumber();
    return a.type === "buy" ? 1 : -1;
  });

  const totalSellCumulativeVolume = cleanedOrderbook.reduce(
    (previousVolume, currentOrder) =>
      currentOrder.type === "sell"
        ? previousVolume.add(currentOrder.sell.howMuch)
        : previousVolume,
    new BigNumber(0),
  );

  const orderbook = mapAccum(
    (accumulator, currentOrder) => {
      const enhancedOrder = { ...currentOrder };
      if (enhancedOrder.type === "sell") {
        enhancedOrder.cumulativeVolume = accumulator;
        return [accumulator.minus(enhancedOrder.sell.howMuch), enhancedOrder];
      } else if (enhancedOrder.type === "buy") {
        enhancedOrder.cumulativeVolume = accumulator.add(
          enhancedOrder.buy.howMuch,
        );
        return [enhancedOrder.cumulativeVolume, enhancedOrder];
      }
      throw new Error(
        `Order type must be specified ${JSON.stringify(enhancedOrder)}`,
      );
    },
    totalSellCumulativeVolume,
    cleanedOrderbook,
  )[1];

  return orderbook;
};

export default getOrderbook;
