export const types = {
  LOAD_RANKING_REQUESTED: "LOAD_RANKING_REQUESTED:ranking:melon.fund",
  LOAD_RANKING_SUCCEEDED: "LOAD_RANKING_SUCCEEDED:ranking:melon.fund",
  LOAD_RANKING_FAILED: "LOAD_RANKING_FAILED:ranking:melon.fund",
};

export const actions = {
  loadRanking: () => ({
    type: types.LOAD_RANKING_REQUESTED,
  }),
  loadRankingFailed: reason => ({
    type: types.LOAD_RANKING_FAILED,
    reason,
  }),
  loadRankingSucceeded: rankingList => ({
    type: types.LOAD_RANKING_SUCCEEDED,
    rankingList,
  }),
};
