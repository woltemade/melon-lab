import BigNumber from "bignumber.js";
import { setup, subscribe, executeRequest } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as generalCreators } from "../general";
import { creators as factsheetCreators } from "../factsheet/duck";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";

const investMiddleware = store => next => action => {
  const { type, ...params } = action;

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
        .then(subscribeRequestResponse =>
          executeRequest(
            subscribeRequestResponse.id,
            store.getState().general.fundAddress,
            setup.web3.eth.accounts[0],
          ),
        )
        .then(() => {
          store.dispatch(generalCreators.update({ mode: "Manage" }));
          store.dispatch(factsheetCreators.requestInformations());
          store.dispatch(fundHoldingsCreators.requestHoldings());
        })
        .catch(err => {
          throw err;
        });
      break;
    }

    case types.CHANGE: {
      let amount;
      let total;

      if (params.amount) {
        total = params.amount * currentState.price;
        store.dispatch(
          creators.update({
            amount: params.amount.toString(10),
            total: total.toString(10),
          }),
        );
      } else if (params.total) {
        amount = params.total / currentState.price;
        store.dispatch(
          creators.update({
            amount: amount.toString(10),
            total: params.total.toString(10),
          }),
        );
      }
      break;
    }

    default:
  }

  return next(action);
};

export default investMiddleware;
