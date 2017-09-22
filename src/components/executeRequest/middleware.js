import BigNumber from "bignumber.js";
import { setup, executeRequest } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as factsheetCreators } from "../factsheet/duck";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";
import { creators as generalCreators } from "../general";

const executeRequestMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().executeRequest;
  let requestId;

  switch (type) {
    case types.EXECUTE: {
      console.log(
        "Calling execute with ",
        currentState.requestId,
        store.getState().general.fundAddress,
      );
      executeRequest(
        currentState.requestId,
        store.getState().general.fundAddress,
        setup.web3.eth.accounts[0],
      )
        .then(response => {
          console.log("Request executed: ", response);
          store.dispatch(generalCreators.update({ mode: "Manage" }));
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

export default executeRequestMiddleware;
