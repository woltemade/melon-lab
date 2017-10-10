import { getRecentTrades } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as tradeHelperCreators } from "../tradeHelper/duck";

const recentTradesMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_RECENT_TRADES: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      getRecentTrades(
        baseTokenSymbol,
        quoteTokenSymbol,
        1,
      ).then(rawRecentTrades => {
        const recentTrades = rawRecentTrades.map(trade => {
          trade.price = trade.price.toString();
          trade.quantity = trade.quantity.toString();
          // CAUTION: here we switch the order type to match the user terminology
          trade.ourOrderType = trade.type === "buy" ? "Sell" : "Buy";
          const rawDate = trade.timeStamp;
          const formattedDate = `${rawDate.getDate()}-${rawDate.getMonth() +
            1}-${rawDate.getFullYear()}, ${rawDate.getHours()}:${rawDate.getMinutes()}:${rawDate.getSeconds()} `;
          trade.timestamp = formattedDate;
          return trade;
        });
        store.dispatch(
          creators.updateRecentTrades({
            recentTrades,
            baseTokenSymbol,
            quoteTokenSymbol,
          }),
        );
        if (recentTrades.length)
          store.dispatch(
            tradeHelperCreators.update({
              last: 1 / recentTrades[recentTrades.length - 1].price,
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
