export const types = {
  GET_HOLDINGS_REQUESTED: "GET_HOLDINGS_REQUESTED:fundHoldings:melon.fund",
  GET_HOLDINGS_SUCCEEDED: "GET_HOLDINGS_SUCCEEDED:fundHoldings:melon.fund",
  GET_HOLDINGS_FAILED: "GET_HOLDINGS_FAILED:fundHoldings:melon.fund",
};

export const actions = {
  getHoldings: () => ({
    type: types.GET_HOLDINGS_REQUESTED,
  }),
  getHoldingsFailed: reason => ({
    type: types.GET_HOLDINGS_FAILED,
    reason,
  }),
  getHoldingsSucceeded: holdings => ({
    type: types.GET_HOLDINGS_SUCCEEDED,
    holdings,
  }),
};
