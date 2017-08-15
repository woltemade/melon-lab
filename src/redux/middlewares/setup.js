import { createVault } from "@melonproject/melon.js";
import { types } from "../ducks/setup";

const setupMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().setup;

  switch (type) {
    case types.CREATE: {
      createVault(currentState.name, window.web3.eth.accounts[0]).then(res => {
        console.log("Vault successfully created: ", res);
        return res;
      });
      break;
    }
    default:
  }

  return next(action);
};

export default setupMiddleware;
