export const initialState = {
  trades: [],
};

export const types = {
  REQUEST_RECENTTRADES: "REQUEST_TRADES:recentTrades:melon.network",
  UPDATE_RECENTTRADES: "UPDATE_RECENTTRADES:recentTrades:melon.network",
};

export const creators = {
  requestRecentTrades: assetPair => ({
    type: types.REQUEST_TRADES,
    assetPair,
  }),
  updateRecentTrades: newValues => ({
    type: types.UPDATE_TRADES,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_TRADES: {
      return {
        ...state,
        ...params,
      };
    }
    case types.UPDATE_TRADES: {
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
