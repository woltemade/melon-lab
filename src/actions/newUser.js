export const types = {
  GENERATE_WALLET_REQUESTED: "GENERATE_WALLET_REQUESTED:newuser:melon.fund",
  GENERATE_WALLET_SUCCEEDED: "GENERATE_WALLET_SUCCEEDED:newuser:melon.fund",
  GENERATE_WALLET_FAILED: "GENERATE_WALLET_FAILED:newuser:melon.fund",
};

export const actions = {
  generateWallet: () => ({
    type: types.GENERATE_WALLET_REQUESTED,
  }),
  generateWalletFailed: reason => ({
    type: types.GENERATE_WALLET_FAILED,
    reason,
  }),
  generateWalletSucceeded: wallet => ({
    type: types.GENERATE_WALLET_SUCCEEDED,
    wallet,
  }),
};
