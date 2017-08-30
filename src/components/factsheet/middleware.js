import { performCalculations } from "@melonproject/melon.js";
import { types, creators } from "./duck";

const factsheetMiddleware = store => next => action => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_INFORMATIONS: {
      performCalculations("0x90a765a2ba68f2644dd7b8f6b671128409daab7f") // store.getState().setup.vaultAddress,
        .then(response => {
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
