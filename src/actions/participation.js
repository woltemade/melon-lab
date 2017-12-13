export const types = {
  SUBSCRIBE_REQUESTED: "SUBSCRIBE_REQUESTED:participation:melon.fund",
  SUBSCRIBE_SUCCEEDED: "SUBSCRIBE_SUCCEEDED:participation:melon.fund",
  SUBSCRIBE_FAILED: "SUBSCRIBE_FAILED:participation:melon.fund",
  REDEEM_REQUESTED: "REDEEM_REQUESTED:participation:melon.fund",
  REDEEM_SUCCEEDED: "REDEEM_SUCCEEDED:participation:melon.fund",
  REDEEM_FAILED: "REDEEM_FAILED:participation:melon.fund",
};

export const actions = {
  subscribe: () => ({
    type: types.SUBSCRIBE_REQUESTED,
  }),
  subscribeFailed: reason => ({
    type: types.SUBSCRIBE_FAILED,
    reason,
  }),
  subscribeSucceeded: rankingList => ({
    type: types.SUBSCRIBE_SUCCEEDED,
    rankingList,
  }),
  redeem: () => ({
    type: types.REDEEM_REQUESTED,
  }),
  redeemFailed: reason => ({
    type: types.REDEEM_FAILED,
    reason,
  }),
  redeemSucceeded: rankingList => ({
    type: types.REDEEM_SUCCEEDED,
    rankingList,
  }),
};
