import { types } from "../actions/ethereum";

const MAX_BLOCK_TIME_SECONDS = 14;

export const providers = {
  PARITY: "Personal Parity",
  METAMASK: "MetaMask",
  INJECTED: "Unknown Injected",
  LOCAL: "Other local node",
  HOSTED: "Hosted by us",
  NONE: "No provider found",
};

export const networks = {
  KOVAN: "42",
  MAIN: "1",
};

const getNetworkName = id => {
  const networkEntry = Object.entries(networks).find(
    ([, value]) => id.toString() === value,
  );
  return networkEntry ? networkEntry[0] : null;
};

const initialState = {
  // observed state
  account: null,
  balance: null,
  blockNumber: 0,
  lastUpdate: null,
  network: 0,
  provider: providers.NONE,
  syncing: true,
  isConnected: false,

  // derived state
  networkName: null,
  isReadyToVisit: false,
  isReadyToTrade: false,
};

const isUpToDate = state =>
  new Date() - state.lastUpdate < MAX_BLOCK_TIME_SECONDS * 1000;

const isReadyToVisit = state =>
  !state.syncing &&
  state.network === "42" &&
  state.isConnected &&
  isUpToDate(state);

const isReadyToTrade = state =>
  isReadyToVisit(state) &&
  !!state.account &&
  state.balance > 0 &&
  state.blockNumber > 0;

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.SET_PROVIDER]: reducers.merge,
  [types.HAS_CONNECTED]: reducers.merge,
  [types.NEW_BLOCK]: reducers.merge,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  const derivedState = {
    isReadyToVisit: isReadyToVisit(newState),
    isReadyToTrade: isReadyToTrade(newState),
    networkName: getNetworkName(newState.network),
  };

  return {
    ...newState,
    ...derivedState,
  };
};

export default reducer;
