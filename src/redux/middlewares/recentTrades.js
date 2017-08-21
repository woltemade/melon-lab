import { getExchangeContract, getPrices } from "@melonproject/melon.js";
import { types, creators } from "../ducks/recentTrades";

const recentTradesMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().recentTrades;

  switch (type) {
    case types.REQUEST_TRADES: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];

      break;
    }
    default:
  }

  return next(action);
};

export default recentTradesMiddleware;
