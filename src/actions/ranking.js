export const types = {
  GET_RANKING_REQUESTED: "GET_RANKING_REQUESTED:ranking:melon.fund",
  GET_RANKING_SUCCEEDED: "GET_RANKING_SUCCEEDED:ranking:melon.fund",
  GET_RANKING_FAILED: "GET_RANKING_FAILED:ranking:melon.fund",
  SET_LOADING: "SET_LOADING:ranking:melon.fund",
  SET_SEARCH: "SET_SEARCH:ranking:melon.fund",
  SET_ORDERING: "SET_ORDERING:ranking:melon.fund",
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
  setLoading: loading => ({
    type: types.SET_LOADING,
    ...loading,
  }),
  setSearch: search => ({
    type: types.SET_SEARCH,
    search,
  }),
  setOrdering: ordering => ({
    type: types.SET_ORDERING,
    ordering,
  }),
};
