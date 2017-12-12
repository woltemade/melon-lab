export const types = {
  GET_RECENTTRADES_REQUESTED: "GET_RECENTTRADES_REQUESTED:orderbook:melon.fund",
  GET_RECENTTRADES_SUCCEEDED: "GET_RECENTTRADES_SUCCEEDED:orderbook:melon.fund",
  GET_RECENTTRADES_FAILED: "GET_RECENTTRADES_FAILED:orderbook:melon.fund",
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
