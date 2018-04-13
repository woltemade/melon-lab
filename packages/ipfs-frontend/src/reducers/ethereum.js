import { providers } from "@melonproject/melon.js";
import { types } from "../actions/ethereum";
import mergeReducer from "../utils/mergeReducer";

const initialState = {
  // observed state
  account: null,
  ethBalance: "0",
  mlnBalance: "0",
  blockNumber: 0,
  lastUpdate: null,
  network: 0,
  provider: providers.NONE,
  syncing: false,
  isConnected: false,
  isUpToDate: false,
  isDataValid: true, // Data Feed
};

export const reducer = mergeReducer(initialState, types);

export default reducer;
