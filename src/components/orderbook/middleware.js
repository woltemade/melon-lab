import BigNumber from "bignumber.js";
import { getOrderbook } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const orderbookMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().orderbook;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      getOrderbook(baseTokenSymbol, quoteTokenSymbol).then(orderbook => {
        store.dispatch(creators.updateOrderbook({ orders: orderbook }));
        const formattedOrderbook = orderbook.map(order => {
          const result = order;
          result.price = order.price.toString();
          result.cumulativeVolume = order.cumulativeVolume.toString();
          result.buy.howMuch = order.buy.howMuch.toString();
          result.sell.howMuch = order.sell.howMuch.toString();
          return result;
        });
        const sellOrders = formattedOrderbook
          .slice(0, orderbook.length / 2)
          .reverse();
        const buyOrders = formattedOrderbook.slice(
          orderbook.length / 2,
          orderbook.length,
        );
        store.dispatch(creators.updateOrderbook({ buyOrders, sellOrders }));
      });
      break;
    }
    default:
  }

  return next(action);
};

export default orderbookMiddleware;
