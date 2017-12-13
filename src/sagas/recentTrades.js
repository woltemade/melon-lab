import { takeLatest, call, put, select } from "redux-saga/effects";
import { getRecentTrades } from "@melonproject/melon.js";
import { actions } from "../actions/recentTrades";
import { types as ethereumTypes } from "../actions/ethereum";

function* getRecentTradesSaga() {
  const assetPair = yield select(state => state.recentTrades.assetPair);
  const baseTokenSymbol = assetPair.split("/")[0];
  const quoteTokenSymbol = assetPair.split("/")[1];
  if (true) {
    try {
      const rawRecentTrades = yield call(
        getRecentTrades,
        baseTokenSymbol,
        quoteTokenSymbol,
      );
      const trades = rawRecentTrades.map(trade => {
        // CAUTION: here we switch the order type to match the user terminology
        trade.ourOrderType = trade.type === "buy" ? "Sell" : "Buy";
        return trade;
      });

      yield put(
        actions.getRecentTradesSucceeded({
          trades,
        }),
      );
    } catch (err) {
      console.error(err);
      yield put(actions.getRecentTradesFailed(err));
    }
  }
}

function* recentTrades() {
  // yield takeLatest(types.GET_RECENTTRADES_REQUESTED, getRecentTradesSaga);
  // yield takeLatest(ethereumTypes.HAS_CONNECTED, getRecentTradesSaga);
}

export default recentTrades;
