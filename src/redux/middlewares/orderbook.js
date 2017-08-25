import BigNumber from "bignumber.js";
import { getOrderbook } from "@melonproject/melon.js";
import { types, creators } from "../ducks/orderbook";

const orderbookMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().orderbook;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      getOrderbook(baseTokenSymbol, quoteTokenSymbol).then(orderbook => {
        const formattedOrderbook = orderbook.map(order => {
          const result = order;
          result.price = order.price.toNumber();
          result.cumulativeVolume = order.cumulativeVolume.toNumber();
          result.buy.howMuch = order.buy.howMuch.toNumber();
          result.sell.howMuch = order.sell.howMuch.toNumber();
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
