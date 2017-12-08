export const types = {
  GET_RANKING_REQUESTED: "GET_RANKING_REQUESTED:ranking:melon.fund",
  GET_RANKING_SUCCEEDED: "GET_RANKING_SUCCEEDED:ranking:melon.fund",
  GET_RANKING_FAILED: "GET_RANKING_FAILED:ranking:melon.fund",
};

export const actions = {
  getRanking: () => ({
    type: types.GET_RANKING_REQUESTED,
  }),
  getRankingFailed: reason => ({
    type: types.GET_RANKING_FAILED,
    reason,
  }),
  getRankingSucceeded: rankingList => ({
    type: types.GET_RANKING_SUCCEEDED,
    rankingList,
  }),
};
