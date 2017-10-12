export const initialState = {
  baseTokenBalance: 0,
  quoteTokenBalance: 0,
  last: 0,
  bid: 0,
  ask: 0,
};

export const types = {
  REQUEST: "REQUEST:tradeHelper:melon.network",
  UPDATE: "UPDATE:tradeHelper:melon.network",
};

export const creators = {
  request: assetPair => ({
    type: types.REQUEST,
    assetPair,
  }),
  update: newValues => ({
    type: types.UPDATE,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST: {
      return {
        ...state,
        ...params,
      };
    }
    case types.UPDATE: {
      return {
        ...state,
        ...params,
      };
    }
    default:
      return state;
  }
};

export default reducer;
