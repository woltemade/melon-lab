import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getRecentTrades } from "@melonproject/melon.js";
import { actions, types } from "../actions/recentTrades";
import { types as ethereumTypes } from "../actions/ethereum";
import { actions as tradeHelperActions } from "../actions/tradeHelper";

function* getRecentTradesSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const baseTokenSymbol = yield select(state => state.app.assetPair.base);
  const quoteTokenSymbol = yield select(state => state.app.assetPair.quote);

  try {
    const rawRecentTrades = yield call(
      getRecentTrades,
      baseTokenSymbol,
      quoteTokenSymbol,
    );
    const trades = rawRecentTrades.map(trade => ({
      // CAUTION: here we switch the order type to match the user terminology
      ...trade,
      ourOrderType: trade.type === "buy" ? "Sell" : "Buy",
    }));

    yield put(
      actions.getRecentTradesSucceeded({
        trades,
      }),
    );
    const last = trades.length ? trades[trades.length - 1].price : 0;
    yield put(tradeHelperActions.updateTradeInfo({ last }));
  } catch (err) {
    console.error(err);
    yield put(actions.getRecentTradesFailed(err));
  }
}

function* recentTrades() {
  yield takeLatest(types.GET_RECENTTRADES_REQUESTED, getRecentTradesSaga);
}

export default recentTrades;
