export const types = {
  GET_TRADEHISTORY_REQUESTED:
    "GET_TRADEHISTORY_REQUESTED:tradehistory:melon.fund",
  GET_TRADEHISTORY_SUCCEEDED:
    "GET_TRADEHISTORY_SUCCEEDED:tradehistory:melon.fund",
  GET_TRADEHISTORY_FAILED: "GET_TRADEHISTORY_FAILED:tradehistory:melon.fund",
};

export const actions = {
  getTradeHistory: fundAddress => ({
    type: types.GET_TRADEHISTORY_REQUESTED,
    fundAddress,
  }),
  getTradeHistoryFailed: reason => ({
    type: types.GET_TRADEHISTORY_FAILED,
    reason,
  }),
  getTradeHistorySucceeded: trades => ({
    type: types.GET_TRADEHISTORY_SUCCEEDED,
    ...trades,
  }),
};
