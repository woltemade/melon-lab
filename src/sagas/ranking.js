import { takeLatest, call, put, select } from "redux-saga/effects";
import { getRanking } from "@melonproject/melon.js";
import { types, actions } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";

function* getRankingSaga() {
  // const isConnected = yield select(state => state.app.isConnected);

  if (true) {
    try {
      const rankingList = yield call(getRanking);
      console.log("------- ", rankingList);
      yield put(actions.getRankingSucceeded(rankingList));
    } catch (err) {
      console.error(err);
      yield put(actions.getRankingFailed(err));
    }
  }
}

function* ranking() {
  // yield takeLatest(types.GET_RANKING_REQUESTED, getRankingSaga);
  yield takeLatest(ethereumTypes.HAS_CONNECTED, getRankingSaga);
}

export default ranking;
