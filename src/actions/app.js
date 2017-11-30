// Finished is agnostic of success or failure -> Both are finished
export const types = {
  TRANSACTION_STARTED: "TRANSACTION_STARTED:app:ipfs-frontend",
  TRANSACTION_FINISHED: "TRANSACTION_FINISHED:app:ipfs-frontend",
};

export const actions = {
  transactionStarted: () => ({
    type: types.TRANSACTION_STARTED,
  }),
  transactionFinished: () => ({
    type: types.TRANSACTION_FINISHED,
  }),
};
