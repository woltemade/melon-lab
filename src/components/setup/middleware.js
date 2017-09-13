import { setup, setupVault } from "@melonproject/melon.js";
import { types, creators } from "./duck";
import { creators as generalCreators } from "../general";

const setupMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().setup;

  switch (type) {
    case types.CREATE: {
      setupVault(currentState.name, setup.web3.eth.accounts[0])
        .then(response => {
          console.log("Vault successfully created: ", response);
          store.dispatch(
            creators.change({
              vaultAddress: response.address,
              vaultOwner: response.owner,
              loading: false,
            }),
          );
          store.dispatch(
            generalCreators.update({
              vaultAddress: response.address,
              managerAddress: setup.web3.eth.accounts[0],
              vaultId: response.id,
              vaultName: response.name,
              inceptionDate: response.timestamp,
              mode: "invest",
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

export default setupMiddleware;
