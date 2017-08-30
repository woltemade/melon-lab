import { getRecentTrades } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const recentTradesMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_RECENT_TRADES: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      getRecentTrades(
        baseTokenSymbol,
        quoteTokenSymbol,
        7,
      ).then(rawRecentTrades => {
        const recentTrades = rawRecentTrades.map(trade => {
          trade.price = trade.price.toString();
          trade.quantity = trade.quantity.toString();
          return trade;
        });
        store.dispatch(
          creators.updateRecentTrades({
            recentTrades,
            baseTokenSymbol,
            quoteTokenSymbol,
          }),
        );
      });

      break;
    }
    default:
  }

  return next(action);
};

export default recentTradesMiddleware;
