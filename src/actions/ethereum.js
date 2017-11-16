export const types = {
  SET_PROVIDER: "SET_PROVIDER:ethereum:melon.js",
  HAS_CONNECTED: "HAS_CONNECTED:ethereum:melon.js",
  NEW_BLOCK: "NEW_BLOCK:ethereum:melon.js",
};

export const creators = {
  setProvider: provider => ({
    type: types.SET_PROVIDER,
    provider,
  }),
  hasConnected: network => ({
    type: types.HAS_CONNECTED,
    isConnected: true,
    network,
  }),
  newBlock: ({ blockNumber, syncing, account, balance, network }) => ({
    type: types.NEW_BLOCK,
    lastUpdate: new Date(),
    blockNumber,
    syncing,
    account,
    balance,
    network,
  }),
};
