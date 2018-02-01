import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { actions, types } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as routeTypes } from "../actions/routes";
import { add, greaterThan, divide } from "../utils/functionalBigNumber";
// import rankingMock from "../utils/mocks/ranking.json";

function getRanking() {
  return fetch("https://ranking.melon.fund", { method: "GET" }).then(resp =>
    resp.json().then(json => json),
  );
}

function* getRankingSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    yield put(actions.setLoading({ loading: true }));
    const rankingList = yield call(getRanking);
    const bigNumberifyRanking = rankingList.map(fund => ({
      ...fund,
      sharePrice: fund.sharePrice.toString(),
    }));
    const filteredRanking = bigNumberifyRanking
      .sort((a, b) => (greaterThan(a.sharePrice, b.sharePrice) ? -1 : 1))
      .filter(fund => fund.isCompeting);
    const nonCompeting = bigNumberifyRanking.filter(fund => !fund.isCompeting);
    const sumTop100Registered = filteredRanking.reduce(
      (acc, fund) => add(acc, fund.sharePrice),
      0,
    );
    const competing = filteredRanking.map(fund => ({
      ...fund,
      expectedPrize: divide(fund.sharePrice, sumTop100Registered).times(550),
    }));
    const finalRanking = [...nonCompeting, ...competing].sort(
      (a, b) => (greaterThan(a.sharePrice, b.sharePrice) ? -1 : 1),
    );
    const withRank = finalRanking.map((fund, i) => ({
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
