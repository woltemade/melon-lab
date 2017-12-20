import { types } from "../actions/tradeHelper";

export const initialState = {
  baseTokenBalance: 0,
  quoteTokenBalance: 0,
  last: 0,
  bid: 0,
  ask: 0,
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.TRADE_INFO]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
