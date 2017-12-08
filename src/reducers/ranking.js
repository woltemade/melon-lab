import { types } from "../actions/ranking";

export const initialState = {
  rankingList: [
    {
      address: "0xBADASS",
      name: "LOADING",
      sharePrice: 0,
      inception: "RIGHTNOW",
    },
  ],
};

const reducers = {
  merge: (state, params) => ({
    ...state,
    ...params,
  }),
  default: state => ({ ...state }),
};

const mapActionToReducer = {
  [types.GET_RANKING_SUCCEEDED]: reducers.merge,
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  const matchedReducer = mapActionToReducer[type] || reducers.default;
  const newState = matchedReducer(state, params);

  return newState;
};

export default reducer;
