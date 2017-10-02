import BigNumber from "bignumber.js";
import {
  setup,
  subscribe,
  redeem,
  performCalculations,
} from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as generalCreators } from "../general";
import { creators as executeRequestCreators } from "../executeRequest/duck";

const participationMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().participation;

  switch (type) {
    case types.INVEST: {
      if (currentState.participationType === "Invest") {
        subscribe(
          store.getState().general.fundAddress,
          new BigNumber(currentState.amount),
          new BigNumber(currentState.total),
          new BigNumber(0.1),
          setup.web3.eth.accounts[0],
        )
          .then(request => {
            console.log("Subscription receipt: ", request);
            store.dispatch(
              executeRequestCreators.update({
                requestId: request.id,
              }),
            );
            store.dispatch(
              creators.change({
                loading: false,
                amount: "Amount",
                price: "Price per share",
                total: "Total",
              }),
            );
            store.dispatch(generalCreators.update({ pendingRequest: true }));
          })
          .catch(err => {
            throw err;
          });
      } else if (currentState.participationType === "Redeem") {
        redeem(
          store.getState().general.fundAddress,
          new BigNumber(currentState.amount),
          new BigNumber(currentState.total),
          new BigNumber(0.1),
          setup.web3.eth.accounts[0],
        )
          .then(request => {
            console.log("Redeem request ", request);
            store.dispatch(
              executeRequestCreators.update({
                requestId: request.id,
              }),
            );
            store.dispatch(
              creators.change({
                loading: false,
                amount: "Amount",
                price: "Price per share",
                total: "Total",
              }),
            );
            store.dispatch(generalCreators.update({ pendingRequest: true }));
          })
          .catch(err => {
            throw err;
          });
      }
      break;
    }

    case types.REQUEST_PRICE: {
      performCalculations(
        store.getState().general.fundAddress,
      ).then(calculations => {
        const enhancedSharePrice =
          currentState.participationType === "Invest"
            ? calculations.sharePrice.toNumber() * 1.05
            : calculations.sharePrice.toNumber() * 0.95;

        store.dispatch(creators.update({ price: enhancedSharePrice }));
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

export default participationMiddleware;
