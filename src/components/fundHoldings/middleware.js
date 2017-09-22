import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const fundHoldingsMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().fundHoldings;

  switch (type) {
    case types.REQUEST_HOLDINGS: {
      currentState.assets.forEach(asset => {
        getBalance(asset, store.getState().general.fundAddress)
          .then(balance => {
            store.dispatch(
              creators.updateHoldings({
                [asset]: balance.toNumber(),
              }),
            );
          })
          .catch(err => {
            throw err;
          });
      });
      break;
    }
    default:
  }
  return next(action);
};

export default fundHoldingsMiddleware;
