import { setup, createVault } from "@melonproject/melon.js";
import { types, creators } from "../ducks/setup";

const setupMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().setup;

  switch (type) {
    case types.CREATE: {
      createVault(currentState.name, setup.web3.eth.accounts[0])
        .then(response => {
          console.log("Vault successfully created: ", response);
          store.dispatch(
            creators.change({
              vaultAddress: response.address,
              vaultOwner: response.owner,
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

export default setupMiddleware;
