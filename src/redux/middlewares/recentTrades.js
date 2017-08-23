import { setup, getExchangeContract } from "@melonproject/melon.js";
import { types, creators } from "../ducks/recentTrades";

const recentTradesMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().recentTrades;

  switch (type) {
    case types.REQUEST_RECENT_TRADES: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];
      const blocksPerDay = 21600;
      const recentTrades = [];
      getExchangeContract().then(exchangeContract => {
        const trades = exchangeContract.Trade(
          {},
          {
            fromBlock: 3355685 - blocksPerDay * 7,
            toBlock: "latest",
          },
          (error, result) => {
            if (!error) {
              recentTrades.push(result.args);
            }
          },
        );
        trades.stopWatching();
        recentTrades.map(trade => {
          trade.sell_how_much = trade.sell_how_much.toNumber();
          trade.buy_how_much = trade.buy_how_much.toNumber();
          return trade;
        });
        console.log(recentTrades);
      });
      break;
    }
    default:
  }

  return next(action);
};

export default recentTradesMiddleware;
