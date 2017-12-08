import { takeLatest, call, put, select } from "redux-saga/effects";
import { getHoldingsAndPrices } from "@melonproject/melon.js";
import { types, actions } from "../actions/ranking";
import { types as ethereumTypes } from "../actions/ethereum";

function* getHoldingsSaga() {
  // const isConnected = yield select(state => state.app.isConnected);

  if (true) {
    try {
      const holdings = yield call(getHoldingsAndPrices);
      yield put(actions.getHoldingsSucceeded(holdings));
    } catch (err) {
      console.error(err);
      yield put(actions.getHoldingsFailed(err));
    }
  }
}

function* ranking() {
  yield takeLatest(types.GET_HOLDINGS_REQUESTED, getHoldingsSaga);
  // yield takeLatest(ethereumTypes.HAS_CONNECTED, getHoldingsSaga);
}

export default ranking;
