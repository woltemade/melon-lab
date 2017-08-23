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
          order.price = order.price.toNumber();
          order.cumulativeVolume = order.cumulativeVolume.toNumber();
          order.buy.howMuch = order.buy.howMuch.toNumber();
          order.sell.howMuch = order.sell.howMuch.toNumber();
          return order;
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
