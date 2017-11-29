import { types } from "../actions/fund";

export const initialState = {
  id: 0,
  name: "-",
  managementFee: 0,
  performanceFee: 0,
  address: "",
  owner: "",
  timestamp: 0,
  gav: "0",
  managementReward: "0",
  performanceReward: "0",
  unclaimedRewards: "0",
  nav: "0",
  sharePrice: "0",
  totalSupply: "0",
};

const reducers = {
  setAddress: (state, { address }) => ({
    ...state,
    address,
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
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
