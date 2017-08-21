import {
  getExchangeContract,
  getOrder,
  getPrices,
} from "@melonproject/melon.js";
import { types, creators } from "../ducks/orderbook";

const orderbookMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().orderbook;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];

      getExchangeContract().then(contract => {
        contract.getLastOrderId().then(lastId => {
          const endIndex = lastId.minus(105).toNumber();
          const buyOrders = [];
          const sellOrders = [];
          for (let id = lastId.toNumber(); id > endIndex; id -= 1) {
            getOrder(id)
              .then(order => {
                if (
                  order.isActive &&
                  currentState.orders.indexOf(order.id) === -1
                ) {
                  const enhancedOrder = order;
                  if (
                    enhancedOrder.buy.symbol === baseTokenSymbol &&
                    enhancedOrder.sell.symbol === quoteTokenSymbol
                  ) {
                    enhancedOrder.buyPrice = getPrices(order).buy.toNumber();
                    buyOrders.push(enhancedOrder);
                    currentState.orders.push(enhancedOrder.id);
                    store.dispatch(creators.updateOrderbook({ buyOrders }));
                  } else if (
                    enhancedOrder.buy.symbol === quoteTokenSymbol &&
                    enhancedOrder.sell.symbol === baseTokenSymbol
                  ) {
                    enhancedOrder.sellPrice = getPrices(order).sell.toNumber();
                    sellOrders.push(enhancedOrder);
                    currentState.orders.push(enhancedOrder.id);
                    store.dispatch(creators.updateOrderbook({ sellOrders }));
                  }
                }
              })
              .catch(err => {
                throw err;
              });
          }
          // store.dispatch(creators.updateOrderbook({ buyOrders, sellOrders }));
          console.log(currentState);
        });
      });
      break;
    }
    default:
  }

  return next(action);
};

export default orderbookMiddleware;
