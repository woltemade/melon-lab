import { types } from "../actions/fund";

export const initialState = {
  id: 0,
  name: "-",
  managementFee: 0,
  performanceFee: 0,
  address: "",
  owner: "",
  timestamp: 0,
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.SETUP_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
