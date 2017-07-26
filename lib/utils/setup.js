const config = {};

const setup = currentProvider => {
  config.currentProvider = currentProvider;
};

export default setup;
export const currentProvider = config.currentProvider;
