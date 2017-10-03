import { getFundRecentTrades } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const tradingActivityMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_FUND_RECENT_TRADES: {
      console.log(store.getState().general.fundAddress);
      getFundRecentTrades(
        store.getState().general.fundAddress,
        2,
      ).then(rawFundRecentTrades => {
        const fundRecentTrades = rawFundRecentTrades.map(trade => {
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
          creators.updateFundRecentTrades({
            fundRecentTrades,
          }),
        );
      });

      break;
    }
    default:
  }

  return next(action);
};

export default tradingActivityMiddleware;
