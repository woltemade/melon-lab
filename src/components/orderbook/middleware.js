import BigNumber from "bignumber.js";
import { getOrderbook } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as tradeHelperCreators } from "../tradeHelper/duck";

const orderbookMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      getOrderbook(baseTokenSymbol, quoteTokenSymbol)
        .then(orderbook => {
          const formattedOrderbook = orderbook.map(order => {
            const result = order;
            result.price = order.price.toString();
            result.cumulativeVolume = order.cumulativeVolume.toString();
            result.buy.howMuch = order.buy.howMuch.toString();
            result.sell.howMuch = order.sell.howMuch.toString();
            return result;
          });
          const sellOrders = formattedOrderbook
            .filter(o => o.type === "sell")
            .reverse();
          const buyOrders = formattedOrderbook.filter(o => o.type === "buy");
          const totalSellVolume = sellOrders.reduce(
            (acc, o) => acc.add(o.sell.howMuch),
            new BigNumber(0),
          );
          const totalBuyVolume = buyOrders.reduce(
            (acc, o) => acc.add(o.buy.howMuch),
            new BigNumber(0),
          );

          store.dispatch(
            creators.updateOrderbook({
              orders: orderbook,
              buyOrders,
              sellOrders,
              totalSellVolume,
              totalBuyVolume,
            }),
          );
          if (buyOrders.length) {
            store.dispatch(
              tradeHelperCreators.update({
                bid: buyOrders[0].price,
              }),
            );
          } else {
            store.dispatch(
              tradeHelperCreators.update({
                bid: 0,
              }),
            );
          }
          if (sellOrders.length) {
            store.dispatch(
              tradeHelperCreators.update({
                ask: sellOrders[0].price,
              }),
            );
          } else {
            store.dispatch(
              tradeHelperCreators.update({
                ask: 0,
              }),
            );
          }
        })
        .catch(error => console.log(error));
      break;
    }
    default:
  }

  return next(action);
};

export default orderbookMiddleware;
