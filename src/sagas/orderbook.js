import { takeLatest, call, put, select, take } from "redux-saga/effects";
import {
  getOrderbook,
  deserializeOrder,
  averagePrice,
} from "@melonproject/melon.js";
import { change } from "redux-form";
import BigNumber from "bignumber.js";
import { types, actions } from "../actions/orderbook";
import { types as ethereumTypes } from "../actions/ethereum";

function* getOrderbookSaga() {
  const baseTokenSymbol = yield select(state => state.app.assetPair.base);
  const quoteTokenSymbol = yield select(state => state.app.assetPair.quote);

  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  try {
    const rawOrderbook = yield call(
      getOrderbook,
      baseTokenSymbol,
      quoteTokenSymbol,
    );
    const orders = rawOrderbook.map(order => {
      const result = order;
      result.price = order.price.toString();
      result.cumulativeVolume = order.cumulativeVolume.toString();
      result.buy.howMuch = order.buy.howMuch.toString();
      result.sell.howMuch = order.sell.howMuch.toString();
      return result;
    });
    const sellOrders = orders.filter(o => o.type === "sell").reverse();
    const buyOrders = orders.filter(o => o.type === "buy");
    const totalSellVolume = buyOrders.length
      ? buyOrders[buyOrders.length - 1].cumulativeVolume
      : 0;
    const totalBuyVolume = sellOrders.length
      ? sellOrders[sellOrders.length - 1].cumulativeVolume
      : 0;
    yield put(
      actions.getOrderbookSucceeded({
        orders,
        sellOrders,
        buyOrders,
        totalSellVolume,
        totalBuyVolume,
      }),
    );
  } catch (err) {
    console.error(err);
    yield put(actions.getOrderbookFailed(err));
  }
}

function* selectOrderSaga() {
  const selectedOrderId = yield select(state => state.orderbook.selectedOrder);
  const selectedOrder = yield select(state =>
    state.orderbook.orders.find(o => o.id === selectedOrderId),
  );
  try {
    let index;
    let subsetOfOrders;
    let average;
    let orderType;
    if (selectedOrder.type === "buy") {
      orderType = "Sell";
      const buyOrders = yield select(state => state.orderbook.buyOrders);
      const deserializedBuyOrders = buyOrders.map(order =>
        deserializeOrder(order),
      );
      index = deserializedBuyOrders.indexOf(selectedOrder);
      subsetOfOrders = deserializedBuyOrders.slice(0, index + 1);
      average = averagePrice("buy", subsetOfOrders);
    } else if (selectedOrder.type === "sell") {
      orderType = "Buy";
      const sellOrders = yield select(state => state.orderbook.sellOrders);
      const deserializedSellOrders = sellOrders.map(order =>
        deserializeOrder(order),
      );
      index = deserializedSellOrders.indexOf(selectedOrder);
      subsetOfOrders = deserializedSellOrders.slice(0, index + 1);
      average = averagePrice("sell", subsetOfOrders);
    }

    const total = average.times(selectedOrder.cumulativeVolume);

    const amount = selectedOrder.cumulativeVolume;
    const price = average;

    yield put(change("trade", "strategy", "Market"));
    yield put(change("trade", "quantity", amount));
    yield put(change("trade", "total", total));
    yield put(change("trade", "price", price));
    yield put(change("trade", "type", orderType));
  } catch (err) {
    console.error(err);
  }
}

function* orderbook() {
  yield takeLatest(types.GET_ORDERBOOK_REQUESTED, getOrderbookSaga);
  yield takeLatest(types.SELECT_ORDER, selectOrderSaga);
}

export default orderbook;
