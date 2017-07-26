const config = {};

const setup = web3 => {
  config.web3 = web3;
  config.currentProvider = web3.currentProvider;
};

export default setup;
export const currentProvider = config.currentProvider;
export const web3 = config.web3;
