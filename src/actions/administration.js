export const types = {
  TOGGLE_SUBSCRIPTION_REQUESTED:
    "TOGGLE_SUBSCRIPTION_REQUESTED:fundAdministration:melon.network",
  TOGGLE_SUBSCRIPTION_SUCCEEDED:
    "TOGGLE_SUBSCRIPTION_SUCCEEDED:fundAdministration:melon.network",
  TOGGLE_SUBSCRIPTION_FAILED:
    "TOGGLE_SUBSCRIPTION_FAILED:fundAdministration:melon.network",
  TOGGLE_REDEMPTION_REQUESTED:
    "TOGGLE_REDEMPTION_REQUESTED:fundAdministration:melon.network",
  TOGGLE_REDEMPTION_SUCCEEDED:
    "TOGGLE_REDEMPTION_SUCCEEDED:fundAdministration:melon.network",
  TOGGLE_REDEMPTION_FAILED:
    "TOGGLE_REDEMPTION_FAILED:fundAdministration:melon.network",
  CONVERT_UNCLAIMED_REWARDS_REQUESTED:
    "CONVERT_UNCLAIMED_REWARDS_REQUESTED:fundAdministration:melon.network",
  CONVERT_UNCLAIMED_REWARDS_SUCCEEDED:
    "CONVERT_UNCLAIMED_REWARDS_SUCCEEDED:fundAdministration:melon.network",
  CONVERT_UNCLAIMED_REWARDS_FAILED:
    "CONVERT_UNCLAIMED_REWARDS_FAILED:fundAdministration:melon.network",
  SHUTDOWN_REQUESTED: "SHUTDOWN_REQUESTED:fundAdministration:melon.network",
  SHUTDOWN_SUCCEEDED: "SHUTDOWN_SUCCEEDED:fundAdministration:melon.network",
  SHUTDOWN_FAILED: "SHUTDOWN_FAILED:fundAdministration:melon.network",
};

export const actions = {
  toggleSubscription: address => ({
    type: types.TOGGLE_SUBSCRIPTION_REQUESTED,
    address,
  }),
  toggleSubscriptionFailed: reason => ({
    type: types.TOGGLE_SUBSCRIPTION_FAILED,
    reason,
  }),
  toggleSubscriptionSucceeded: subscriptionAllowed => ({
    type: types.TOGGLE_SUBSCRIPTION_SUCCEEDED,
    subscriptionAllowed,
  }),
  toggleRedemption: address => ({
    type: types.TOGGLE_REDEMPTION_REQUESTED,
    address,
  }),
  toggleRedemptionFailed: reason => ({
    type: types.TOGGLE_REDEMPTION_FAILED,
    reason,
  }),
  toggleRedemptionSucceeded: redemptionAllowed => ({
    type: types.TOGGLE_REDEMPTION_SUCCEEDED,
    redemptionAllowed,
  }),
  convertUnclaimedRewards: address => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_REQUESTED,
    address,
  }),
  convertUnclaimedRewardsFailed: reason => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_FAILED,
    reason,
  }),
  convertUnclaimedRewardsSucceeded: () => ({
    type: types.CONVERT_UNCLAIMED_REWARDS_SUCCEEDED,
  }),
  shutdown: address => ({
    type: types.SHUTDOWN_REQUESTED,
    address,
  }),
  shutdownFailed: reason => ({
    type: types.SHUTDOWN_FAILED,
    reason,
  }),
  shutdownSucceeded: () => ({
    type: types.SHUTDOWN_SUCCEEDED,
  }),
};
