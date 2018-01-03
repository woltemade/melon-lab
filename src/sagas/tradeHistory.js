import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getFundRecentTrades } from "@melonproject/melon.js";
import { actions, types } from "../actions/tradeHistory";
import { types as ethereumTypes } from "../actions/ethereum";

function* getTradeHistorySaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const fundAddress = yield select(state => state.fund.address);

  try {
    const rawTradeHistory = yield call(getFundRecentTrades, fundAddress);
    const trades = rawTradeHistory.map(trade => ({
      // CAUTION: here we switch the order type to match the user terminology
      ...trade,
      ourOrderType: trade.type === "buy" ? "Sell" : "Buy",
    }));

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

function* tradeHistory() {
  yield takeLatest(types.GET_TRADEHISTORY_REQUESTED, getTradeHistorySaga);
}

export default tradeHistory;
