export const types = {
  INVEST_REQUESTED: "INVEST_REQUESTED:participation:melon.fund",
  INVEST_SUCCEEDED: "INVEST_SUCCEEDED:participation:melon.fund",
  INVEST_FAILED: "INVEST_FAILED:participation:melon.fund",
  REDEEM_REQUESTED: "REDEEM_REQUESTED:participation:melon.fund",
  REDEEM_SUCCEEDED: "REDEEM_SUCCEEDED:participation:melon.fund",
  REDEEM_FAILED: "REDEEM_FAILED:participation:melon.fund",
  EXECUTE_REQUESTED: "EXECUTE_REQUESTED:participation:melon.fund",
  EXECUTE_SUCCEEDED: "EXECUTE_SUCCEEDED:participation:melon.fund",
  EXECUTE_FAILED: "EXECUTE_FAILED:participation:melon.fund",
};

export const actions = {
  invest: ({ amount, total, directlyExecute }) => ({
    type: types.INVEST_REQUESTED,
    amount,
    total,
    directlyExecute,
  }),
  investFailed: reason => ({
    type: types.INVEST_FAILED,
    reason,
  }),
  investSucceeded: () => ({
    type: types.INVEST_SUCCEEDED,
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
  execute: id => ({
    type: types.EXECUTE_REQUESTED,
    id,
  }),
  executeFailed: reason => ({
    type: types.EXECUTE_FAILED,
    reason,
  }),
  executeSucceeded: () => ({
    type: types.EXECUTE_SUCCEEDED,
  }),
};
