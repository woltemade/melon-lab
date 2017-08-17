import BigNumber from "bignumber.js";
import { setup, subscribe } from "@melonproject/melon.js";
import { types, creators } from "../ducks/invest";

const investMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().invest;

  switch (type) {
    case types.INVEST: {
      subscribe(
        // store.getState().setup.vaultAddress,
        "0xd6bff734e29200669d4b209f0ac01c82df462aca",
        new BigNumber(currentState.total),
        new BigNumber(currentState.amount),
      )
        .then(response => {
          store.dispatch(creators.change({ loading: false }));
          console.log("Successful subscription ", response);
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

export default investMiddleware;
