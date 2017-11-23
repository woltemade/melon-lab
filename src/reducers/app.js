import { providers, networks } from "@melonproject/melon.js";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as fundTypes } from "../actions/fund";

// Note: These items are sorted: NO_PROVIDER is the state before NO_CONNECTION
// and so on. (Thats why it is named ...Path and not ...States)
export const onboardingPath = {
  NO_PROVIDER: "No provider",
  NO_CONNECTION: "No connection",
  WRONG_NETWORK: "Wrong network",
  LOCKED_ACCOUNT: "Locked account",
  INSUFFICENT_ETH: "Insufficent ETH",
  INSUFFICENT_MLN: "Insufficent MLN",
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
  transactionInProgress: false,
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
    ...state,
    onboardingState:
      params.provider !== providers.NONE
        ? onboardingPath.NO_CONNECTION
        : onboardingPath.NO_PROVIDER,
  }),
  setConnection: (state, params) => ({
    ...state,
    onboardingState:
      params.network === networks.KOVAN
        ? onboardingPath.LOCKED_ACCOUNT
        : onboardingPath.WRONG_NETWORK,
  }),
  newBlock: (state, params) => {
    const newState = {
      ...state,
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
  transactionStarted: state => ({
    ...state,
    transactionInProgress: true,
  }),
  transactionFinished: state => ({
    ...state,
    transactionInProgress: false,
  }),
  setupSucceeded: state => ({
    ...state,
    onboardingState: onboardingPath.NOT_INVESTED_IN_OWN_FUND,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [ethereumTypes.SET_PROVIDER]: reducers.setProvider,
  [ethereumTypes.HAS_CONNECTED]: reducers.setConnection,
  [ethereumTypes.NEW_BLOCK]: reducers.newBlock,
  [fundTypes.SETUP_REQUESTED]: reducers.transactionStarted,
  [fundTypes.SETUP_SUCCEEDED]: reducers.setupSucceeded,
  [fundTypes.SETUP_FAILED]: reducers.transactionFinished,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
