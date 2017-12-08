import { types } from "../actions/holdings";

export const initialState = {
  holdings: [],
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GET_HOLDINGS_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
