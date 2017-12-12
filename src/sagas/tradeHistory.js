import { takeLatest, call, put, select } from "redux-saga/effects";
import { getFundRecentTrades } from "@melonproject/melon.js";
import { actions } from "../actions/tradeHistory";
import { types as ethereumTypes } from "../actions/ethereum";

function* getTradeHistorySaga() {
  const fundAddress = yield select(state => state.fund.address);

  if (true) {
    try {
      const rawTradeHistory = yield call(getFundRecentTrades, fundAddress);
      const trades = rawTradeHistory.map(trade => {
        // CAUTION: here we switch the order type to match the user terminology
        trade.ourOrderType = trade.type === "buy" ? "Sell" : "Buy";
        return trade;
      });

      yield put(
        actions.getTradeHistorySucceeded({
          trades,
        }),
      );
    } catch (err) {
      console.error(err);
      yield put(actions.getTradeHistoryFailed(err));
    }
  }
}

function* tradeHistory() {
  // yield takeLatest(types.GET_RECENTTRADES_REQUESTED, getTradeHistorySaga);
  yield takeLatest(ethereumTypes.HAS_CONNECTED, getTradeHistorySaga);
}

export default tradeHistory;
