import { setup } from "@melonproject/melon.js";
import { types, creators } from "./general";
import { creators as orderbookCreators } from "./orderbook/duck";
import { creators as recentTradesCreators } from "./recentTrades/duck";
import { creators as tradeHelperCreators } from "./tradeHelper/duck";

const generalMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.UPDATE_ASSET_PAIR: {
      store.dispatch(
        creators.update({
          baseTokenSymbol: params.assetPair.split("/")[0],
          quoteTokenSymbol: params.assetPair.split("/")[1],
        }),
      );
      store.dispatch(orderbookCreators.requestOrderbook(params.assetPair));
      store.dispatch(
        recentTradesCreators.requestRecentTrades(params.assetPair),
      );
      store.dispatch(tradeHelperCreators.request(params.assetPair));
      break;
    }
    default:
  }

  return next(action);
};

export default generalMiddleware;
