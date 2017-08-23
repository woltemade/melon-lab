import { getRecentTrades } from "@melonproject/melon.js";
import { types, creators } from "../ducks/recentTrades";

const recentTradesMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().recentTrades;

  switch (type) {
    case types.REQUEST_RECENT_TRADES: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];

      getRecentTrades(
        baseTokenSymbol,
        quoteTokenSymbol,
        7,
      ).then(recentTrades => {
        recentTrades.map(trade => {
          trade.price = trade.price.toNumber();
          trade.quantity = trade.quantity.toNumber();
        });
        store.dispatch(creators.updateRecentTrades({ recentTrades }));
      });
      break;
    }
    default:
  }

  return next(action);
};

export default recentTradesMiddleware;
