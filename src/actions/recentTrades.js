export const types = {
  GET_RECENTTRADES_REQUESTED:
    "GET_RECENTTRADES_REQUESTED:recentTrades:melon.fund",
  GET_RECENTTRADES_SUCCEEDED:
    "GET_RECENTTRADES_SUCCEEDED:recentTrades:melon.fund",
  GET_RECENTTRADES_FAILED: "GET_RECENTTRADES_FAILED:recentTrades:melon.fund",
};

export const actions = {
  getRecentTrades: assetPair => ({
    type: types.GET_RECENTTRADES_REQUESTED,
    assetPair,
  }),
  getRecentTradesFailed: reason => ({
    type: types.GET_RECENTTRADES_FAILED,
    reason,
  }),
  getRecentTradesSucceeded: recentTrades => ({
    type: types.GET_RECENTTRADES_SUCCEEDED,
    ...recentTrades,
  }),
};
