import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const tradeHelperMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST: {
      const baseTokenSymbol = store.getState().general.assetPair.split("/")[0];
      const quoteTokenSymbol = store.getState().general.assetPair.split("/")[1];

      getBalance(baseTokenSymbol, "0xac11c203248bb8bb5e49b37cd51b43a82620d9c9")
        .then(baseTokenBalance => {
          store.dispatch(
            creators.update({
              baseTokenBalance: baseTokenBalance.toNumber(),
            }),
          );
          return getBalance(
            quoteTokenSymbol,
            "0xac11c203248bb8bb5e49b37cd51b43a82620d9c9",
          );
        })
        .then(quoteTokenBalance => {
          store.dispatch(
            creators.update({
              quoteTokenBalance: quoteTokenBalance.toNumber(),
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
