import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getHoldingsAndPrices } from "@melonproject/melon.js";
import { types, actions } from "../actions/holdings";
import { types as ethereumTypes } from "../actions/ethereum";

function* getHoldingsSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const fundAddress = yield select(state => state.fund.address);

  try {
    const holdings = yield call(getHoldingsAndPrices, fundAddress);
    yield put(actions.getHoldingsSucceeded(holdings));
  } catch (err) {
    console.error(err);
    yield put(actions.getHoldingsFailed(err));
  }
}

function* holdings() {
  yield takeLatest(types.GET_HOLDINGS_REQUESTED, getHoldingsSaga);
}

export default holdings;
