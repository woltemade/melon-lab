export const initialState = {
  fundRecentTrades: [],
};

export const types = {
  REQUEST_FUND_RECENT_TRADES:
    "REQUEST_FUND_RECENT_TRADES:recentTrades:melon.network",
  UPDATE_FUND_RECENT_TRADES:
    "UPDATE_FUND_RECENT_TRADES:recentTrades:melon.network",
};

export const creators = {
  requestFundRecentTrades: () => ({
    type: types.REQUEST_FUND_RECENT_TRADES,
  }),
  updateFundRecentTrades: newValues => ({
    type: types.UPDATE_FUND_RECENT_TRADES,
    ...newValues,
  }),
};

export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;

  switch (type) {
    case types.REQUEST_FUND_RECENT_TRADES: {
      return {
        ...state,
      };
    }
    case types.UPDATE_FUND_RECENT_TRADES: {
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
