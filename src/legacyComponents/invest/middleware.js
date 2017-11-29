import BigNumber from "bignumber.js";
import { setup, subscribe, executeRequest } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as generalCreators } from "../general";
import { creators as fundHoldingsCreators } from "../fundHoldings/duck";
import { actions as ethereumActions } from "../../actions/ethereum";

const investMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState();
  const investState = currentState.invest;

  switch (type) {
    case types.INVEST: {
      subscribe(
        store.getState().general.fundAddress,
        new BigNumber(investState.amount),
        new BigNumber(investState.total),
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
          store.dispatch(fundHoldingsCreators.requestHoldings());

          // HACK: Retrigger accountChanged to refresh new onboarding state
          store.dispatch(
            ethereumActions.accountChanged(currentState.ethereum.account),
          );
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
        total = params.amount * investState.price;
        store.dispatch(
          creators.update({
            amount: params.amount.toString(10),
            total: total.toString(10),
          }),
        );
      } else if (params.total) {
        amount = params.total / investState.price;
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
