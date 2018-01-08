import { takeLatest, take, select, call, put } from "redux-saga/effects";
import {
  makeOrder,
  takeMultipleOrders,
  getPrices,
  decryptWallet,
  deserializeOrder,
  matchOrders,
} from "@melonproject/melon.js";
import { types, actions } from "../actions/trade";
import { actions as fundActions } from "../actions/fund";
import { actions as modalActions, types as modalTypes } from "../actions/modal";
import displayNumber from "../utils/displayNumber";

function* placeOrderSaga(action) {
  try {
    const fundAddress = yield select(state => state.fund.address);
    let buyHowMuch;
    let buyWhichToken;
    let sellHowMuch;
    let sellWhichToken;

    if (action.values.type === "Buy") {
      buyHowMuch = action.values.quantity;
      buyWhichToken = yield select(state => state.app.assetPair.base);
      sellHowMuch = action.values.total;
      sellWhichToken = yield select(state => state.app.assetPair.quote);
    } else if (action.values.type === "Sell") {
      buyHowMuch = action.values.total;
      buyWhichToken = yield select(state => state.app.assetPair.quote);
      sellHowMuch = action.values.quantity;
      sellWhichToken = yield select(state => state.app.assetPair.base);
    }

    yield put(
      modalActions.confirm(
        `Do you really want to place the following limit order:  BUY ${buyHowMuch} ${buyWhichToken} and SELL ${sellHowMuch} ${sellWhichToken}? If yes, please type your password below:`,
      ),
    );
    const { password } = yield take(modalTypes.CONFIRMED);
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    yield call(
      makeOrder,
      decryptedWallet,
      fundAddress,
      sellWhichToken,
      buyWhichToken,
      sellHowMuch,
      buyHowMuch,
    );
    yield put(actions.placeOrderSucceeded());
    yield put(modalActions.close());
  } catch (err) {
    if (err.name === "password") {
      yield put(modalActions.error("Wrong password"));
    } else if (err.name === "EnsureError") {
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(actions.placeOrderFailed());
  }
}

function* takeOrderSaga(action) {
  try {
    const fundAddress = yield select(state => state.fund.address);
    const managerAddress = yield select(state => state.ethereum.account);
    const selectedOrderId = yield select(
      state => state.orderbook.selectedOrder,
    );
    const selectedOrder = yield select(state =>
      state.orderbook.orders.find(o => o.id === selectedOrderId),
    );
    const ourOrderType = action.values.type;
    const theirOrderType =
      ourOrderType.toLowerCase() === "buy" ? "sell" : "buy";

    let buyHowMuch;
    let buyWhichToken;
    let sellHowMuch;
    let sellWhichToken;
    if (ourOrderType === "Buy") {
      buyHowMuch = action.values.quantity;
      buyWhichToken = yield select(state => state.app.assetPair.base);
      sellHowMuch = action.values.total;
      sellWhichToken = yield select(state => state.app.assetPair.quote);
    } else if (ourOrderType === "Sell") {
      buyHowMuch = action.values.total;
      buyWhichToken = yield select(state => state.app.assetPair.quote);
      sellHowMuch = action.values.quantity;
      sellWhichToken = yield select(state => state.app.assetPair.base);
    }

    const priceThreshold = getPrices(selectedOrder)[theirOrderType];

    const buyOrders = yield select(state => state.orderbook.buyOrders);
    const sellOrders = yield select(state => state.orderbook.sellOrders);
    const orders =
      theirOrderType === "buy"
        ? buyOrders.map(order => deserializeOrder(order))
        : sellOrders.map(order => deserializeOrder(order));

    const matchedOrders = matchOrders(theirOrderType, priceThreshold, orders);
    const quantityAsked = buyHowMuch;

    yield put(
      modalActions.confirm(
        `Do you really want to place the following market order:  BUY ${displayNumber(
          buyHowMuch,
        )} ${buyWhichToken} and SELL ${displayNumber(
          sellHowMuch,
        )} ${sellWhichToken}? If yes, please type your password below:`,
      ),
    );
    const { password } = yield take(modalTypes.CONFIRMED);
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    yield call(
      takeMultipleOrders,
      decryptedWallet,
      matchedOrders,
      managerAddress,
      fundAddress,
      quantityAsked,
    );
    yield put(actions.takeOrderSucceeded());
    yield put(modalActions.close());
    yield put(fundActions.infoRequested(fundAddress));
  } catch (err) {
    if (err.name === "password") {
      yield put(modalActions.error("Wrong password"));
    } else if (err.name === "EnsureError") {
      console.error(err)
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(actions.takeOrderFailed());
  }
}

function* trade() {
  yield takeLatest(types.PLACE_ORDER_REQUESTED, placeOrderSaga);
  yield takeLatest(types.TAKE_ORDER_REQUESTED, takeOrderSaga);
}

export default trade;
