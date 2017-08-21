export const initialState = {
  orders: [],
};

export const types = {
  UPDATE_ORDERBOOK: "UPDATE_ORDERBOOK:orderbook:melon.network",
};

export const creators = {
  requestOrderbook: assetPair => ({
    type: types.REQUEST_ORDERBOOK,
    assetPair,
  }),
  updateOrderbook: newValues => ({
    type: types.UPDATE_ORDERBOOK,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_ORDERBOOK: {
      return {
        ...state,
        ...params,
      };
    }
    case types.UPDATE_ORDERBOOK: {
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
