import { getRanking, getEnvironment } from "@melonproject/melon.js";

import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { actions, types } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as routeTypes } from "../actions/routes";
import { greaterThan, equals } from "../utils/functionalBigNumber";
// import rankingMock from "../utils/mocks/ranking.json";

function* loadRanking() {
  // return fetch("https://ranking.melon.fund", { method: "GET" }).then(resp =>
  //   resp.json().then(json => json),
  // );

  const environment = getEnvironment();
  return yield call(getRanking, environment);
}

function* getRankingSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    yield put(actions.setLoading({ loading: true }));
    const rankingList = yield call(loadRanking);
    const bigNumberifyRanking = rankingList.map(fund => ({
      ...fund,
      sharePrice: fund.sharePrice.toString(),
    }));
    const sortedRanking = bigNumberifyRanking.sort((a, b) => {
      if (equals(a.sharePrice, 1) && equals(b.sharePrice, 1))
        return a.inception < b.inception ? -1 : 1;
      return greaterThan(a.sharePrice, b.sharePrice) ? -1 : 1;
    });
    yield put(actions.getRankingSucceeded(sortedRanking));
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
