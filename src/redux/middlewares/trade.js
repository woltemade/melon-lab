import { types, creators } from "../ducks/trade";

const tradeMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().trade;
  const orderbookState = store.getState().orderbook;

  switch (type) {
    case types.PREFILL: {
      let index;
      let subsetOfOrders;

      const sellOrders = orderbookState.sellOrders;
      const buyOrders = orderbookState.buyOrders;

      if (params.selectedOrder.type === "buy") {
        index = orderbookState.buyOrders.indexOf(params.selectedOrder);
        subsetOfOrders = buyOrders.slice(0, index + 1);
        console.log("Buy orders subset ", subsetOfOrders);
      } else if (params.selectedOrder.type === "sell") {
        index = orderbookState.sellOrders.indexOf(params.selectedOrder);
        subsetOfOrders = sellOrders.slice(0, index + 1);
        console.log("Sell orders subset ", subsetOfOrders);
      }
      const cumulatedVolumes = subsetOfOrders.reduce(
        (accumulator, current) => ({
          buy: accumulator.buy + current.buy.howMuch,
          sell: accumulator.sell + current.sell.howMuch,
        }),
        {
          buy: 0,
          sell: 0,
        },
      );

      const averagePrice =
        params.selectedOrder.type === "buy"
          ? cumulatedVolumes.sell / cumulatedVolumes.buy
          : cumulatedVolumes.buy / cumulatedVolumes.sell;

      console.log("Average price ", averagePrice);

      break;
    }
    default:
  }

  return next(action);
};

export default tradeMiddleware;
