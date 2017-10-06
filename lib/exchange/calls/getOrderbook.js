import { mapAccum } from "ramda";
import BigNumber from "bignumber.js";
import getActiveOrders from "./getActiveOrders";
/*
  @ returns an array of active orders for the specified asset pair
*/
const getOrderbook = async (baseTokenSymbol, quoteTokenSymbol) => {
  const cleanedOrderbook = await getActiveOrders(
    baseTokenSymbol,
    quoteTokenSymbol,
  );

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
