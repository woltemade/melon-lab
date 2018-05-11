export const types = {
  SETUP: 'SETUP:routes:melon.fund',
  ROOT: 'ROOT:routes:melon.fund',
  FUND: 'FUND:routes:melon.fund',
  RANKING: 'RANKING:routes:melon.fund',
  ACCOUNT_GENERATE: 'ACCOUNT_GENERATE:routes:melon.fund',
  ACCOUNT_RESTORE: 'ACCOUNT_RESTORE:routes:melon.fund',
  ACCOUNT_CREATE: 'ACCOUNT_CREATE:routes:melon.fund',
  ACCOUNT_ENCRYPT: 'ACCOUNT_ENCRYPT:routes:melon.fund',
  MY_ACCOUNT: 'MY_ACCOUNT:routes:melon.fund',
  DONE: 'DONE:routes:melon.fund',
  RESTORE: 'RESTORE:routes:melon.fund',
  COMPETITION: 'COMPETITION:routes:melon.fund',
};

export const routeMap = {
  [types.SETUP]: '/setup',
  [types.ROOT]: '/',
  [types.RANKING]: '/ranking',
  [types.ACCOUNT_GENERATE]: '/account/generate',
  [types.ACCOUNT_RESTORE]: '/account/restore',
  [types.ACCOUNT_CREATE]: '/account/create',
  [types.ACCOUNT_ENCRYPT]: '/account/encrypt',
  [types.MY_ACCOUNT]: '/myaccount',
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
  restore: () => ({
    type: types.ACCOUNT_RESTORE,
  }),
  root: () => ({
    type: types.ROOT,
  }),
  encrypt: () => ({
    type: types.ACCOUNT_ENCRYPT,
  }),
  setup: () => ({
    type: types.SETUP,
  }),
  accountGenerate: () => ({
    type: types.ACCOUNT_GENERATE,
  }),
  myAccount: () => ({
    type: types.MY_ACCOUNT,
  }),
  competition: address => ({
    type: types.COMPETITION,
    payload: { address },
  }),
};
