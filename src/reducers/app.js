import { types } from "../actions/app";

// Note: These items are sorted: NO_PROVIDER is the state before NO_CONNECTION
// and so on. (Thats why it is named ...Path and not ...States)
export const onboardingPath = {
  NO_CONNECTION: "No connection",
  WRONG_NETWORK: "Wrong network",
  NO_ACCOUNT: "No account",
  INSUFFICENT_FUNDS: "Insufficent Funds",
  NO_FUND_CREATED: "No fund created ",
  NOT_INVESTED_IN_OWN_FUND: "Not invested in own fund",
  ONBOARDED: "Onboarded",
};

const initialState = {
  onboardingState: onboardingPath.NO_CONNECTION,
  isReadyToVisit: false,
  isReadyToInteract: false,
  isReadyToTrade: false,
  isReadyToInvest: false,
  transactionInProgress: false,
  usersFundChecked: false,
  usersFund: "",
  assetPair: "ETH-T/MLN-T",
};

const reducers = {
  transactionStarted: state => ({
    ...state,
    transactionInProgress: true,
  }),
  transactionFinished: state => ({
    ...state,
    transactionInProgress: false,
  }),
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  setUsersFunc: (state, params) => ({
    ...state,
    ...params,
    usersFundChecked: true,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.TRANSACTION_STARTED]: reducers.transactionStarted,
  [types.TRANSACTION_FINISHED]: reducers.transactionFinished,
  [types.SET_READY_STATE]: reducers.merge,
  [types.SET_USERS_FUND]: reducers.setUsersFunc,
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
