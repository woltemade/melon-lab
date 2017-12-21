export const types = {
  GET_ORDERBOOK_REQUESTED: "GET_ORDERBOOK_REQUESTED:orderbook:melon.fund",
  GET_ORDERBOOK_SUCCEEDED: "GET_ORDERBOOK_SUCCEEDED:orderbook:melon.fund",
  GET_ORDERBOOK_FAILED: "GET_ORDERBOOK_FAILED:orderbook:melon.fund",
};

export const actions = {
  getOrderbook: assetPair => ({
    type: types.GET_ORDERBOOK_REQUESTED,
    assetPair,
  }),
  getOrderbookFailed: reason => ({
    type: types.GET_ORDERBOOK_FAILED,
    reason,
  }),
  getOrderbookSucceeded: orderbookData => ({
    type: types.GET_ORDERBOOK_SUCCEEDED,
    ...orderbookData,
  }),
};
