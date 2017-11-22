import { providers, getNetworkName } from "@melonproject/melon.js";
import { types } from "../actions/ethereum";

const MAX_BLOCK_TIME_SECONDS = 14;

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
};

// TODO: Move this to saga
const isUpToDate = state =>
  new Date() - state.lastUpdate < MAX_BLOCK_TIME_SECONDS * 1000;

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
    networkName: getNetworkName(newState.network),
  };

  return {
    ...newState,
    ...derivedState,
  };
};

export default reducer;
