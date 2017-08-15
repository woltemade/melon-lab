import { setup, createVault } from "@melonproject/melon.js";
import { types } from "../ducks/setup";

const setupMiddleware = store => next => action => {
  const { type, ...params } = action;

  const currentState = store.getState().setup;

  switch (type) {
    case types.CREATE: {
      console.log(window.web3.eth.accounts[0]);
      createVault(currentState.name, window.web3.eth.accounts[0]);
      break;
    }
    default:
  }

  return next(action);
};

export default setupMiddleware;
