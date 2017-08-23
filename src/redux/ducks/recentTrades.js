export const initialState = {
  trades: [],
};

export const types = {
  REQUEST_RECENT_TRADES: "REQUEST_RECENT_TRADES:recentTrades:melon.network",
  UPDATE_RECENT_TRADES: "UPDATE_RECENT_TRADES:recentTrades:melon.network",
};

export const creators = {
  requestRecentTrades: assetPair => ({
    type: types.REQUEST_RECENT_TRADES,
    assetPair,
  }),
  updateRecentTrades: newValues => ({
    type: types.UPDATE_RECENT_TRADES,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_RECENT_TRADES: {
      return {
        ...state,
        ...params,
      };
    }
    case types.UPDATE_RECENT_TRADES: {
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
