import { types } from "../actions/fund";
import { types as adminTypes } from "../actions/administration";
import { types as participationTypes } from "../actions/participation";

const loadingFund = {
  creationDate: 0,
  gav: "0",
  id: 0,
  managementFee: 0,
  managementReward: "0",
  name: "-",
  nav: "0",
  owner: "",
  performanceFee: 0,
  performanceReward: "0",
  personalStake: "0",
  redemptionAllowed: false,
  sharePrice: "0",
  subscriptionAllowed: false,
  totalSupply: "0",
  unclaimedRewards: "0",
  rank: "N/A",
  numberOfFunds: "N/A",
  pendingRequest: null,
  readyToExecute: false,
  inception: "N/A",
};

export const initialState = {
  address: "",
  ...loadingFund,
};

const reducers = {
  setAddress: (state, { address }) => ({
    ...state,
    address,
  }),
  setLoading: (state, { address }) => ({
    ...loadingFund,
    address,
  }),
  resetPendingRequest: state => ({
    ...state,
    pendingRequest: null,
    readyToExecute: false,
  }),
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.SET]: reducers.setAddress,
  [types.SETUP_SUCCEEDED]: reducers.merge,
  [types.INFO_SUCCEEDED]: reducers.merge,
  [types.SHARE_PRICE_SUCCEEDED]: reducers.merge,
  [types.INFO_REQUESTED]: reducers.merge,
  [types.UPDATE_RANKING]: reducers.merge,
  [types.SET_PENDING_REQUEST]: reducers.merge,
  [types.READY_TO_EXECUTE]: reducers.merge,
  [types.SET_LOADING]: reducers.setLoading,
  [participationTypes.EXECUTE_SUCCEEDED]: reducers.resetPendingRequest,
  [adminTypes.TOGGLE_SUBSCRIPTION_SUCCEEDED]: reducers.merge,
  [adminTypes.TOGGLE_REDEMPTION_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
