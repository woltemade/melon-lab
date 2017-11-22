export const types = {
  SET_PROVIDER: "SET_PROVIDER:ethereum:melon.js",
  HAS_CONNECTED: "HAS_CONNECTED:ethereum:melon.js",
  NEW_BLOCK: "NEW_BLOCK:ethereum:melon.js",
};

// Explicitely declare all parameters (no ...args)
export const actions = {
  setProvider: provider => ({
    type: types.SET_PROVIDER,
    provider,
  }),
  hasConnected: network => ({
    type: types.HAS_CONNECTED,
    isConnected: true,
    network,
  }),
  newBlock: ({
    blockNumber,
    syncing,
    account,
    balance,
    network,
    lastUpdate = new Date(),
  }) => ({
    type: types.NEW_BLOCK,
    blockNumber,
    syncing,
    account,
    balance,
    network,
    lastUpdate,
  }),
};
