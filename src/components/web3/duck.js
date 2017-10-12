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

export const initialState = {
  blockNumber: 0,
  lastUpdate: null,
  account: "0x",
  connectionMode: connectionModes.NOT_CONNECTED,
  syncing: true,
  ready: false,
};

export const types = {
  SET_CONNECTION: "SET_CONNECTION:web3:melon.js",
  UPDATE: "UPDATE:web3:melon.js",
};

export const creators = {
  update: ({ blockNumber, syncing, account }) => ({
    type: types.UPDATE,
    blockNumber,
    syncing,
    account,
  }),
  setConnection: connectionMode => ({
    type: types.SET_CONNECTION,
    connectionMode,
  }),
};

const readyCheck = state => ({
  ...state,
  ready:
    state.connectionMode !== connectionModes.NOT_CONNECTED &&
    !state.syncing &&
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
  };

  const currentReducer = mapReducer[type];

  return currentReducer ? currentReducer(state, params) : state;
};

export default reducer;
