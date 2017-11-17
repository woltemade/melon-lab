import { types } from "../actions/ethereum";
import { providers, networks } from "./ethereum";

// Note: These items are sorted: NO_PROVIDER is the state before NO_CONNECTION
// and so on. (Thats why it is named ...Path and not ...States)
export const onboardingPath = {
  NO_PROVIDER: "No provider",
  NO_CONNECTION: "No connection",
  WRONG_NETWORK: "Wrong network",
  LOCKED_ACCOUNT: "Locked account",
  INSUFFICENT_ETH: "Insufficent ETH",
  INSUFFICENT_MLN: "Insufficent MLN ",
  NO_FUND_CREATED: "No fund created ",
  NOT_INVESTED_IN_OWN_FUND: "Not invested in own fund",
  NOT_TRADED_YET: "Not traded yet",
  ONBOARDED: "Onboarded",
};

const initialState = {
  onboardingState: onboardingPath.NO_PROVIDER,
  isConnected: false,
  isReadyToVisit: false,
  isReadyToInteract: false,
};

const isReadyToVisit = ({ network }) => network === "42";

const isReadyToInteract = ({
  blockNumber,
  syncing,
  network,
  account,
  balance,
}) =>
  isReadyToVisit({ syncing, network }) &&
  !syncing &&
  !!account &&
  parseInt(balance, 10) > 0 &&
  blockNumber > 0;

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
  newBlock: (state, params) => {
    const newState = {
      isConnected: true,
      isReadyToVisit: isReadyToVisit(params),
      isReadyToInteract: isReadyToInteract(params),
    };

    if (params.network !== networks.KOVAN) {
      return { ...newState, onboardingState: onboardingPath.WRONG_NETWORK };
    } else if (!params.account) {
      return { ...newState, onboardingState: onboardingPath.LOCKED_ACCOUNT };
    } else if (parseInt(params.balance || 0, 10) <= 0) {
      return { ...newState, onboardingState: onboardingPath.INSUFFICENT_ETH };
    }

    return { ...newState, onboardingState: onboardingPath.INSUFFICENT_MLN };
  },
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.SET_PROVIDER]: reducers.setProvider,
  [types.HAS_CONNECTED]: reducers.setConnection,
  [types.NEW_BLOCK]: reducers.newBlock,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
