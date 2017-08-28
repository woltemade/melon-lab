import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "../ducks/fundHoldings";

const fundHoldingsMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().fundHoldings;

  switch (type) {
    case types.REQUEST_HOLDINGS: {
      currentState.assets.forEach(asset => {
        getBalance(asset, "0xac11c203248bb8bb5e49b37cd51b43a82620d9c9")
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
