export const types = {
  ACCOUNT_CHANGED: "ACCOUNT_CHANGED:ethereum:melon.js",
  BLOCK_OVERDUE: "BLOCK_OVERDUE:ethereum:melon.js",
  HAS_CONNECTED: "HAS_CONNECTED:ethereum:melon.js",
  NEW_BLOCK: "NEW_BLOCK:ethereum:melon.js",
  SET_PROVIDER: "SET_PROVIDER:ethereum:melon.js",
};

// Explicitely declare all parameters (no ...args)
export const actions = {
  accountChanged: account => ({
    type: types.ACCOUNT_CHANGED,
    account,
  }),
  blockOverdue: () => ({
    type: types.BLOCK_OVERDUE,
    isUpToDate: false,
  }),
  hasConnected: network => ({
    type: types.HAS_CONNECTED,
    isConnected: true,
    network,
  }),
  setProvider: provider => ({
    type: types.SET_PROVIDER,
    provider,
  }),
  newBlock: ({ blockNumber, syncing, account, ethBalance, mlnBalance }) => ({
    type: types.NEW_BLOCK,
    blockNumber,
    syncing,
    account,
    ethBalance,
    mlnBalance,
    lastUpdate: new Date(),
    isUpToDate: true,
  }),
};
