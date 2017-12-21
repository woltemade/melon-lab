import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getRecentTrades } from "@melonproject/melon.js";
import { actions, types } from "../actions/recentTrades";
import { types as ethereumTypes } from "../actions/ethereum";

function* getRecentTradesSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const assetPair = yield select(state => state.app.assetPair);
  const baseTokenSymbol = assetPair.split("/")[0];
  const quoteTokenSymbol = assetPair.split("/")[1];

  try {
    const rawRecentTrades = yield call(
      getRecentTrades,
      baseTokenSymbol,
      quoteTokenSymbol
    );
    const trades = rawRecentTrades.map(trade => ({
      // CAUTION: here we switch the order type to match the user terminology
      ...trade,
      ourOrderType: trade.type === "buy" ? "Sell" : "Buy"
    }));

    yield put(
      actions.getRecentTradesSucceeded({
        trades
      })
    );
  } catch (err) {
    console.error(err);
    yield put(actions.getRecentTradesFailed(err));
  }
}

function* recentTrades() {
  yield takeLatest(types.GET_RECENTTRADES_REQUESTED, getRecentTradesSaga);
}

export default recentTrades;
