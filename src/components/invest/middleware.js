import BigNumber from "bignumber.js";
import { setup, subscribe } from "@melonproject/melon.js";
import { types } from "./duck";
import { creators as generalCreators } from "../general";
import { creators as executeRequestCreators } from "../executeRequest/duck";

const investMiddleware = store => next => action => {
  const { type } = action;

  const currentState = store.getState().invest;

  switch (type) {
    case types.INVEST: {
      subscribe(
        store.getState().general.fundAddress,
        new BigNumber(currentState.amount),
        new BigNumber(currentState.total),
        new BigNumber(0.1),
        setup.web3.eth.accounts[0],
      )
        .then(subscribeRequestResponse => {
          store.dispatch(
            executeRequestCreators.update({
              requestId: subscribeRequestResponse.id,
            }),
          );
          store.dispatch(generalCreators.update({ mode: "Execute" }));
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
