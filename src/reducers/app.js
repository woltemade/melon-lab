import { types } from "../actions/ethereum";
import { providers, networks } from "./ethereum";

// Note: These items are sorted: NO_PROVIDER is the state before NO_CONNECTION
// and so on. (Thats why it is named ...Path and not ...States)
export const onboardingPath = {
  NO_PROVIDER: "No provider",
  NO_CONNECTION: "No connection",
  WRONG_NETWORK: "Wrong network",
  LOCKED_ACCOUNT: "Locked account",
  INSUFFICENT_FUND: "Insufficent fund",
  READY: "Ready",
};

const initialState = {
  onboardingState: onboardingPath.NO_PROVIDER,
};

const reducers = {
  setProvider: (state, params) => ({
    onboardingState:
      params.provider !== providers.NONE
        ? onboardingPath.NO_CONNECTION
        : onboardingPath.NO_PROVIDER,
  }),
  setConnection: (state, params) => ({
    onboardingState:
      params.network === networks.KOVAN
        ? onboardingPath.LOCKED_ACCOUNT
        : onboardingPath.WRONG_NETWORK,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.SET_PROVIDER]: reducers.setProvider,
  [types.HAS_CONNECTED]: reducers.setConnection,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
