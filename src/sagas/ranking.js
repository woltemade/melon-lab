import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getRanking } from "@melonproject/melon.js";
import { actions } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as routeTypes } from "../actions/routes";

function* getRankingSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    const rankingList = yield call(getRanking);
    yield put(actions.getRankingSucceeded(rankingList));
  } catch (err) {
    console.error(err);
    yield put(actions.getRankingFailed(err));
  }
}

function* ranking() {
  yield takeLatest(routeTypes.RANKING, getRankingSaga);
}

export default ranking;
