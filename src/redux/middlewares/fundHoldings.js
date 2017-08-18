import { getBalance } from "@melonproject/melon.js";
import { types, creators } from "../ducks/fundHoldings";

const fundHoldingsMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().fundholdings;

  switch (type) {
    case types.REQUEST_HOLDINGS: {
      console.log("HERE ", currentState);
      currentState.assets.forEach(asset => {
        getBalance(asset, "0x10d19f7fb1c5df1adf27269c0c01589c76ee3531")
          .then(balance => {
            console.log("Balance for ", asset, " ", balance);
            store.dispatch(
              creators.updateHoldings({
                asset: balance,
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
