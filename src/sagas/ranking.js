import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getRanking } from "@melonproject/melon.js";
import { actions, types } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as routeTypes } from "../actions/routes";

// import rankingMock from "../utils/mocks/ranking.json";

function* getRankingSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    yield put(actions.setLoading({ loading: true }));
    const rankingList = yield call(getRanking);
    const withRank = rankingList.map((fund, i) => ({
      ...fund,
      rank: i + 1,
    }));
    yield put(actions.getRankingSucceeded(withRank));
    yield put(actions.setLoading({ loading: false }));
  } catch (err) {
    console.error(err);
    yield put(actions.getRankingFailed(err));
  }
}

function* ranking() {
  yield takeLatest(routeTypes.RANKING, getRankingSaga);
  yield takeLatest(types.GET_RANKING_REQUESTED, getRankingSaga);
}

export default ranking;
