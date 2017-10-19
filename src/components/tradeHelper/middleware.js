import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const tradeHelperMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];

      getBalance(baseTokenSymbol, store.getState().general.fundAddress)
        .then(baseTokenBalance => {
          store.dispatch(
            creators.update({
              baseTokenBalance: baseTokenBalance.toString(),
            }),
          );
          return getBalance(
            quoteTokenSymbol,
            store.getState().general.fundAddress,
          );
        })
        .then(quoteTokenBalance => {
          store.dispatch(
            creators.update({
              quoteTokenBalance: quoteTokenBalance.toString(),
            }),
          );
        })
        .catch(err => {
          throw err;
        });

      break;
    }
    default:
  }
  return next(action);
};

export default tradeHelperMiddleware;
