export const types = {
  SETUP: "SETUP:routes:melon.fund",
  ROOT: "ROOT:routes:melon.fund",
  FUND: "FUND:routes:melon.fund",
  RANKING: "RANKING:routes:melon.fund",
  ACCOUNT_SETUP: "ACCOUNT_SETUP:routes:melon.fund",
  ACCOUNT_RESTORE: "ACCOUNT_RESTORE:routes:melon.fund",
  ACCOUNT_CREATE: "ACCOUNT_CREATE:routes:melon.fund",
  ACCOUNT_ENCRYPT: "ACCOUNT_ENCRYPT:routes:melon.fund",
  DONE: "DONE:routes:melon.fund",
  RESTORE: "RESTORE:routes:melon.fund",
};

export const routeMap = {
  [types.SETUP]: "/setup",
  [types.ROOT]: "/",
  [types.RANKING]: "/ranking",
  [types.ACCOUNT_SETUP]: "/account/",
  [types.ACCOUNT_RESTORE]: "/account/restore",
  [types.ACCOUNT_CREATE]: "/account/create",
  [types.ACCOUNT_ENCRYPT]: "/account/encrypt",
  [types.DONE]: "/account/done",
  [types.FUND]: "/:address",
};

export const actions = {
  fund: address => ({
    type: types.FUND,
    payload: { address },
  }),
  ranking: () => ({
    type: types.RANKING,
  }),
  restore: () => ({
    type: types.ACCOUNT_RESTORE,
  }),
  setup: () => ({
    type: types.SETUP,
  }),
};
