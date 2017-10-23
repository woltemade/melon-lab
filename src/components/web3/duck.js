const MAX_BLOCK_TIME_SECONDS = 14;

export const connectionModes = {
  METAMASK: "MetaMask",
  UNKNOWN_INJECTED: "Unknown injected",
  // PARITY: "Parity",
  // MIST: "Mist",
  LOCAL: "Local",
  HOSTED: "Hosted",
  NOT_CONNECTED: "Not connected",
};

export const knownNetworks = {
  "1": "Main",
  "42": "Kovan",
  "3": "Robsten",
  "4": "Rinkeby",
};

export const initialState = {
  blockNumber: 0,
  lastUpdate: null,
  account: null,
  network: null,
  connectionMode: connectionModes.NOT_CONNECTED,
  syncing: true,
  ready: false,
  balance: null,
};

export const types = {
  SET_CONNECTION: "SET_CONNECTION:web3:melon.js",
  ACCOUNT_CHANGE: "ACCOUNT_CHANGE:web3:melon.js",
  UPDATE: "UPDATE:web3:melon.js",
};

export const creators = {
  update: ({ blockNumber, syncing, account, balance, network }) => ({
    type: types.UPDATE,
    blockNumber,
    syncing,
    account,
    balance,
    network,
  }),
  setConnection: connectionMode => ({
    type: types.SET_CONNECTION,
    connectionMode,
  }),
  accountChange: account => ({
    type: types.ACCOUNT_CHANGE,
    account,
  }),
};

const readyCheck = state => ({
  ...state,
  ready:
    state.connectionMode !== connectionModes.NOT_CONNECTED &&
    !state.syncing &&
    !!state.account &&
    state.blockNumber > 0 &&
    new Date() - state.lastUpdate < MAX_BLOCK_TIME_SECONDS * 1000,
});

export const reducers = {
  mergeCheckTimestamp: (state, params) => ({
    ...readyCheck({
      ...state,
      ...params,
    }),
    lastUpdate: new Date(),
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const mapReducer = {
    [types.SET_CONNECTION]: reducers.mergeCheckTimestamp,
    [types.UPDATE]: reducers.mergeCheckTimestamp,
    [types.ACCOUNT_CHANGE]: reducers.mergeCheckTimestamp,
  };

  const currentReducer = mapReducer[type];

  return currentReducer ? currentReducer(state, params) : state;
};

export default reducer;
