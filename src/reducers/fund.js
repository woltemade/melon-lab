import { types } from "../actions/fund";

export const initialState = {
  name: "Fund Name",
  managementFee: "0%",
  performanceFee: "0%",
  fundAddress: "",
  fundOwner: "",
  loading: false,
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  loading: state => ({
    ...state,
    loading: true,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.CHANGE]: reducers.merge,
  [types.CREATE]: reducers.loading,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
