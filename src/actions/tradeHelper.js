export const types = {
  TRADE_INFO_REQUESTED: "TRADE_INFO_REQUESTED:tradeHelper:melon.fund",
  TRADE_INFO_SUCCEEDED: "TRADE_INFO_SUCCEEDED:tradeHelper:melon.fund",
  TRADE_INFO_FAILED: "TRADE_INFO_FAILED:tradeHelper:melon.fund",
  UPDATE_TRADE_INFO: "UPDATE_TRADE_INFO:tradeHelper:melon.fund",
};

export const actions = {
  tradeInfoRequested: () => ({
    type: types.TRADE_INFO_REQUESTED,
  }),
  tradeInfoFailed: ({ reason }) => ({
    type: types.TRADE_INFO_FAILED,
    reason,
  }),
  tradeInfoSucceeded: info => ({
    type: types.TRADE_INFO_SUCCEEDED,
    ...info,
  }),
  updateTradeInfo: info => ({
    type: types.UPDATE_TRADE_INFO,
    ...info,
  }),
};
