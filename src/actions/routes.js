export const types = {
  SETUP: "SETUP:routes:melon.fund",
  ROOT: "ROOT:routes:melon.fund",
  FUND: "FUND:routes:melon.fund",
  RANKING: "RANKING:routes:melon.fund",
  NEW_USER: "NEW_USER:routes:melon.fund",
};

export const routeMap = {
  [types.SETUP]: "/setup",
  [types.ROOT]: "/",
  [types.FUND]: "/:address",
  [types.RANKING]: "/ranking",
  [types.NEW_USER]: "/newuser",
};

export const actions = {
  fund: address => ({
    type: types.FUND,
    payload: { address },
  }),
  ranking: () => ({
    type: types.RANKING,
  }),
};
