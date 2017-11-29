export const types = {
  SET: "SET:fund:melon.network",
  INFO_REQUESTED: "INFO_REQUESTED:fund:melon.network",
  INFO_SUCCEEDED: "INFO_SUCCEEDED:fund:melon.network",
  INFO_FAILED: "INFO_FAILED:fund:melon.network",
  SETUP_REQUESTED: "SETUP_REQUESTED:fund:melon.network",
  SETUP_SUCCEEDED: "SETUP_SUCCEEDED:fund:melon.network",
  SETUP_FAILED: "SETUP_FAILED:fund:melon.network",
};

export const actions = {
  set: address => ({
    type: types.SET,
    address,
  }),
  infoSucceeded: ({
    address,
    name,
    owner,
    gav,
    managementReward,
    performanceReward,
    unclaimedRewards,
    nav,
    sharePrice,
    totalSupply,
  }) => ({
    type: types.INFO_SUCCEEDED,
    address,
    name,
    owner,
    gav,
    managementReward,
    performanceReward,
    unclaimedRewards,
    nav,
    sharePrice,
    totalSupply,
  }),
  setupRequested: name => ({
    type: types.SETUP_REQUESTED,
    name,
  }),
  setupSucceeded: ({ id, address, name, timestamp, owner }) => ({
    type: types.SETUP_SUCCEEDED,
    id,
    address,
    name,
    timestamp,
    owner,
  }),
  setupFailed: ({ reason }) => ({
    type: types.SETUP_FAILED,
    reason,
  }),
  infoRequested: address => ({
    type: types.INFO_REQUESTED,
    address,
  }),
  infoFailed: ({ reason }) => ({
    type: types.INFO_FAILED,
    reason,
  }),
};
