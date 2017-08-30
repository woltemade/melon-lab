import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const tradeHelperMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST: {
      const baseTokenSymbol = params.assetPair.split("/")[0];
      const quoteTokenSymbol = params.assetPair.split("/")[1];

      getBalance(baseTokenSymbol, "0x90a765a2ba68f2644dd7b8f6b671128409daab7f")
        .then(baseTokenBalance => {
          store.dispatch(
            creators.update({
              baseTokenBalance: baseTokenBalance.toNumber(),
            }),
          );
          return getBalance(
            quoteTokenSymbol,
            "0x90a765a2ba68f2644dd7b8f6b671128409daab7f",
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
