import { performCalculations } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const factsheetMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().factsheet;

  switch (type) {
    case types.REQUEST_INFORMATIONS: {
      performCalculations("0x10d19f7fb1c5df1adf27269c0c01589c76ee3531") // store.getState().setup.vaultAddress,
        .then(response => {
          console.log("Performed calculations ", response);
          store.dispatch(
            creators.updateInformations({
              aum: response.gav.toNumber(),
              sharePrice: response.sharePrice.toNumber(),
              managementReward: response.managementReward.toNumber(),
              performanceReward: response.performanceReward.toNumber(),
              unclaimedRewards: response.unclaimedRewards.toNumber(),
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

export default factsheetMiddleware;
