import BigNumber from "bignumber.js";
import {
  deserializeOrder,
  averagePrice,
  matchOrders,
  takeMultipleOrders,
  getPrices,
} from "@melonproject/melon.js";
import { types, creators } from "../ducks/trade";

const tradeMiddleware = store => next => action => {
  const { type, ...params } = action;
  const currentState = store.getState().trade;

  switch (type) {
    case types.PREFILL: {
      let index;
      let subsetOfOrders;
      let average;

      if (params.selectedOrder.type === "buy") {
        const buyOrders = store
          .getState()
          .orderbook.buyOrders.map(order => deserializeOrder(order));
        index = buyOrders.indexOf(params.selectedOrder);
        subsetOfOrders = buyOrders.slice(0, index + 1);
        average = averagePrice("buy", subsetOfOrders);
      } else if (params.selectedOrder.type === "sell") {
        const sellOrders = store
          .getState()
          .orderbook.sellOrders.map(order => deserializeOrder(order));
        index = sellOrders.indexOf(params.selectedOrder);
        subsetOfOrders = sellOrders.slice(0, index + 1);
        average = averagePrice("sell", subsetOfOrders);
      }

      const total = average
        .times(new BigNumber(params.selectedOrder.cumulativeVolume))
        .toNumber()
        .toFixed(4);
      const amount = new BigNumber(params.selectedOrder.cumulativeVolume)
        .toNumber()
        .toFixed(4);
      const price = average.toNumber().toFixed(4);

      store.dispatch(
        creators.update({
          amount,
          price,
          total,
        }),
      );

      break;
    }

    case types.CHANGE: {
      let amount;
      let total;

      if (params.amount) {
        total = params.amount * currentState.price;
        store.dispatch(creators.update({ amount: params.amount, total }));
      } else if (params.total) {
        amount = params.total / currentState.price;
        store.dispatch(creators.update({ amount, total: params.total }));
      }
      break;
    }

    case types.PLACE_ORDER: {
      const theirOrderType = currentState.selectedOrder.type;
      const ourOrderType = theirOrderType === "buy" ? "sell" : "buy";
      const priceTreshold = getPrices(currentState.selectedOrder)[
        theirOrderType
      ];

      const orders =
        theirOrderType === "buy"
          ? store
              .getState()
              .orderbook.buyOrders.map(order => deserializeOrder(order))
          : store
              .getState()
              .orderbook.sellOrders.map(order => deserializeOrder(order));
      const matchedOrders = matchOrders(theirOrderType, priceTreshold, orders);
      const quantityAsked =
        ourOrderType === "buy"
          ? new BigNumber(currentState.amount)
          : new BigNumber(currentState.total);

      takeMultipleOrders(
        matchedOrders,
        "0xeE2BB8598725445B532BDb14F522A99E04e84B38",
        "0xac11c203248bb8bb5e49b37cd51b43a82620d9c9",
        quantityAsked,
      ).then(result => {
        console.log(result);
      });
      break;
    }

    default:
  }

  return next(action);
};

export default tradeMiddleware;
