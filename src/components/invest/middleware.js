import BigNumber from "bignumber.js";
import { subscribe } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as factsheetCreators } from "../factsheet/duck";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";

const investMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().invest;

  switch (type) {
    case types.INVEST: {
      subscribe(
        // store.getState().setup.vaultAddress,
        "0x90a765a2ba68f2644dd7b8f6b671128409daab7f",
        new BigNumber(currentState.total),
        new BigNumber(currentState.amount),
      )
        .then(response => {
          console.log("Subscription receipt: ", response);
          store.dispatch(creators.change({ loading: false }));
          store.dispatch(factsheetCreators.requestInformations());
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

export default investMiddleware;
