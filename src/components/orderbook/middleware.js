import { getOrderbook } from "@melonproject/melon.js";
import { types, creators } from "./duck";

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

          store.dispatch(
            creators.updateOrderbook({
              orders: orderbook,
              buyOrders,
              sellOrders,
            }),
          );
        })
        .catch(error => console.log(error));
      break;
    }
    default:
  }

  return next(action);
};

export default orderbookMiddleware;
