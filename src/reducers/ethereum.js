import { providers, getNetworkName } from "@melonproject/melon.js";
import { types } from "../actions/ethereum";

const initialState = {
  // observed state
  account: null,
  ethBalance: "0",
  mlnBalance: "0",
  blockNumber: 0,
  lastUpdate: null,
  network: 0,
  provider: providers.NONE,
  syncing: true,
  isConnected: false,
  isUpToDate: false,
  isDataValid: false, // Data Feed

  // derived state
  networkName: null,
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.ACCOUNT_CHANGED]: reducers.merge,
  [types.BLOCK_OVERDUE]: reducers.merge,
  [types.HAS_CONNECTED]: reducers.merge,
  [types.NEW_BLOCK]: reducers.merge,
  [types.SET_PROVIDER]: reducers.merge,
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
