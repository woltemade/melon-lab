// Finished is agnostic of success or failure -> Both are finished
export const types = {
  TRANSACTION_STARTED: "TRANSACTION_STARTED:app:melon.fund",
  TRANSACTION_FINISHED: "TRANSACTION_FINISHED:app:melon.fund",
  SET_USERS_FUND: "SET_USERS_FUND:app:melon.fund",
  SET_READY_STATE: "SET_READY_STATE:app:melon.fund",
  UPDATE_ASSET_PAIR: "UPDATE_ASSET_PAIR:app:melon.fund",
  SCROLL_TO: "SCROLL_TO:app:melon.fund",
};

export const actions = {
  transactionStarted: () => ({
    type: types.TRANSACTION_STARTED,
  }),
  transactionFinished: () => ({
    type: types.TRANSACTION_FINISHED,
  }),
  setUsersFund: usersFund => ({
    type: types.SET_USERS_FUND,
    usersFund,
  }),
  setReadyState: ({
    onboardingState,
    isConnected,
    isReadyToVisit,
    isReadyToInteract,
    isReadyToInvest,
    isReadyToTrade,
  }) => ({
    type: types.SET_READY_STATE,
    onboardingState,
    isConnected,
    isReadyToVisit,
    isReadyToInteract,
    isReadyToInvest,
    isReadyToTrade,
  }),
  updateAssetPair: assetPair => ({
    type: types.UPDATE_ASSET_PAIR,
    ...assetPair,
  }),
  scrollTo: id => ({
    type: types.SCROLL_TO,
    id,
  }),
};
