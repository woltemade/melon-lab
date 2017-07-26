const config = {};

const setup = (web3, daemonAddress) => {
  config.web3 = web3;
  config.currentProvider = web3.currentProvider;
  config.daemonAddress = daemonAddress;
};

export default setup;
export const currentProvider = config.currentProvider;
export const web3 = config.web3;
export const daemonAddress = config.daemonAddress;
