import { types } from "../actions/recentTrades";

export const initialState = {
  trades: [],
  assetPair: "ETH-T/MLN-T",
  baseSymbol: "ETH-T",
  quoteSymbol: "MLN-T",
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GET_RECENTTRADES_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
