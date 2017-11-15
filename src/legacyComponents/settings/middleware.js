import {
  setup,
  getParticipationAuthorizations,
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutDownFund,
} from "@melonproject/melon.js";
import { types, creators } from "./duck";

const settingsMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_SETTINGS: {
      getParticipationAuthorizations(store.getState().general.fundAddress)
        .then(response => {
          store.dispatch(
            creators.updateSettings({
              ...response,
            }),
          );
        })
        .catch(err => {
          throw err;
        });
      break;
    }
    case types.TOGGLE: {
      if (params.toggleType === "toggleSubscription") {
        toggleSubscription(
          store.getState().general.fundAddress,
          setup.web3.eth.accounts[0],
        ).then(bool =>
          store.dispatch(
            creators.updateSettings({
              subscriptionAllowed: bool,
              loading: false,
            }),
          ),
        );
      } else if (params.toggleType === "toggleRedemption") {
        toggleRedemption(
          store.getState().general.fundAddress,
          setup.web3.eth.accounts[0],
        ).then(bool =>
          store.dispatch(
            creators.updateSettings({
              redemptionAllowed: bool,
              loading: false,
            }),
          ),
        );
      }

      break;
    }

    case types.CONVERT_UNCLAIMED_REWARDS: {
      convertUnclaimedRewards(
        store.getState().general.fundAddress,
        setup.web3.eth.accounts[0],
      )
        .then(response => {
          console.log(response);
          store.dispatch(
            creators.updateSettings({
              loading: false,
            }),
          );
        })
        .catch(err => {
          throw err;
        });
      break;
    }

    case types.SHUT_DOWN: {
      shutDownFund(
        store.getState().general.fundAddress,
        setup.web3.eth.accounts[0],
      )
        .then(response => {
          console.log(response);
          store.dispatch(
            creators.updateSettings({
              loading: false,
            }),
          );
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

export default settingsMiddleware;
