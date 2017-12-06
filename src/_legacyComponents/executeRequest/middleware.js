import { setup, executeRequest } from "@melonproject/melon.js";
import { types } from "./duck";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";
import { creators as generalCreators } from "../general";

const executeRequestMiddleware = store => next => action => {
  const { type } = action;

  const currentState = store.getState().executeRequest;
  // let requestId;

  switch (type) {
    case types.EXECUTE: {
      executeRequest(
        currentState.requestId,
        store.getState().general.fundAddress,
        setup.web3.eth.accounts[0],
      )
        .then(() => {
          if (store.getState().general.mode === "Execute")
            store.dispatch(generalCreators.update({ mode: "Manage" }));
          else if (store.getState().general.pendingRequest === true)
            store.dispatch(generalCreators.update({ pendingRequest: false }));
          store.dispatch(fundHoldingsCreators.requestHoldings());
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

export default executeRequestMiddleware;
