export const types = {
  SETUP_REQUESTED: "SETUP_REQUESTED:fund:melon.network",
  SETUP_SUCCEEDED: "SETUP_SUCCEEDED:fund:melon.network",
  SETUP_FAILED: "SETUP_FAILED:fund:melon.network",
};

export const actions = {
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
};
