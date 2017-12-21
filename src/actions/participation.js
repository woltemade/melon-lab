export const types = {
  SUBSCRIBE_REQUESTED: "SUBSCRIBE_REQUESTED:participation:melon.fund",
  SUBSCRIBE_SUCCEEDED: "SUBSCRIBE_SUCCEEDED:participation:melon.fund",
  SUBSCRIBE_FAILED: "SUBSCRIBE_FAILED:participation:melon.fund",
  REDEEM_REQUESTED: "REDEEM_REQUESTED:participation:melon.fund",
  REDEEM_SUCCEEDED: "REDEEM_SUCCEEDED:participation:melon.fund",
  REDEEM_FAILED: "REDEEM_FAILED:participation:melon.fund",
};

export const actions = {
  subscribe: ({ amount, total }) => ({
    type: types.SUBSCRIBE_REQUESTED,
    amount,
    total,
  }),
  subscribeFailed: reason => ({
    type: types.SUBSCRIBE_FAILED,
    reason,
  }),
  subscribeSucceeded: () => ({
    type: types.SUBSCRIBE_SUCCEEDED,
  }),
  redeem: ({ amount, total }) => ({
    type: types.REDEEM_REQUESTED,
    amount,
    total,
  }),
  redeemFailed: reason => ({
    type: types.REDEEM_FAILED,
    reason,
  }),
  redeemSucceeded: () => ({
    type: types.REDEEM_SUCCEEDED,
  }),
};
