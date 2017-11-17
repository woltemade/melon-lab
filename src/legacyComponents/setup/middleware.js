import { setup, setupFund } from "@melonproject/melon.js";
import { types, creators } from "../../actions/fund";
import { creators as generalCreators } from "../general";

const setupMiddleware = store => next => action => {
  const { type } = action;

  const currentState = store.getState().setup;

  switch (type) {
    case types.CREATE: {
      setupFund(currentState.name, setup.web3.eth.accounts[0])
        .then(response => {
          console.log("Fund successfully created : ", response);
          store.dispatch(
            creators.change({
              fundAddress: response.address,
              fundOwner: setup.web3.eth.accounts[0],
              loading: false,
            }),
          );
          store.dispatch(
            generalCreators.update({
              fundAddress: response.address,
              managerAddress: setup.web3.eth.accounts[0],
              fundId: response.id,
              fundName: response.name,
              inceptionDate: response.timestamp,
              mode: "Invest",
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
