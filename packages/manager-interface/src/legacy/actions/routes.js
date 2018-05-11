export const types = {
  SETUP: 'SETUP:routes:melon.fund',
  ROOT: 'ROOT:routes:melon.fund',
  FUND: 'FUND:routes:melon.fund',
  RANKING: 'RANKING:routes:melon.fund',
  ACCOUNT_GENERATE: 'ACCOUNT_GENERATE:routes:melon.fund',
  ACCOUNT_RESTORE: 'ACCOUNT_RESTORE:routes:melon.fund',
  ACCOUNT_CREATE: 'ACCOUNT_CREATE:routes:melon.fund',
  ACCOUNT: 'ACCOUNT:routes:melon.fund',
  DONE: 'DONE:routes:melon.fund',
  RESTORE: 'RESTORE:routes:melon.fund',
  COMPETITION: 'COMPETITION:routes:melon.fund',
};

export const routeMap = {
  [types.SETUP]: '/setup',
  [types.ROOT]: '/',
  [types.RANKING]: '/ranking',
  [types.ACCOUNT_GENERATE]: '/account/generate',
  [types.ACCOUNT_GENERATE]: '/account/generate',
  [types.ACCOUNT_RESTORE]: '/account/restore',
  [types.ACCOUNT_CREATE]: '/account/create',
  [types.ACCOUNT]: '/account',
  [types.DONE]: '/account/done',
  [types.FUND]: '/:address',
  [types.COMPETITION]: '/:address/competition',
};

export const actions = {
  fund: address => ({
    type: types.FUND,
    payload: { address },
  }),
  ranking: () => ({
    type: types.RANKING,
  }),
  root: () => ({
    type: types.ROOT,
  }),
  setup: () => ({
    type: types.SETUP,
  }),
  accountGenerate: () => ({
    type: types.ACCOUNT_GENERATE,
  }),
  accountRestore: () => ({
    type: types.ACCOUNT_RESTORE,
  }),
  account: () => ({
    type: types.ACCOUNT,
  }),
  competition: address => ({
    type: types.COMPETITION,
    payload: { address },
  }),
};
