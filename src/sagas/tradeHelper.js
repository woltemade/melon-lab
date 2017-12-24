import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getBalance } from "@melonproject/melon.js";
import { actions, types } from "../actions/tradeHelper";
import { types as ethereumTypes } from "../actions/ethereum";
import { types as fundTypes } from "../actions/fund";

function* getTradeInfoSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);
  let fundAddress = yield select(state => state.fund.address);
  if (!fundAddress) {
    yield take(fundTypes.INFO_REQUESTED);
    fundAddress = yield select(state => state.fund.address);
  }
  const baseTokenSymbol = yield select(state => state.app.assetPair.base);
  const quoteTokenSymbol = yield select(state => state.app.assetPair.quote);

  try {
    const baseTokenBalance = yield call(
      getBalance,
      baseTokenSymbol,
      fundAddress,
    );
    const quoteTokenBalance = yield call(
      getBalance,
      quoteTokenSymbol,
      fundAddress,
    );

    yield put(
      actions.tradeInfoSucceeded({ baseTokenBalance, quoteTokenBalance }),
    );
  } catch (err) {
    console.error(err);
    yield put(actions.tradeInfoFailed(err));
  }
}

function* tradeHelper() {
  yield takeLatest(types.TRADE_INFO_REQUESTED, getTradeInfoSaga);
}

export default tradeHelper;
