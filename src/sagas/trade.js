import { takeLatest, take, select, call, put } from "redux-saga/effects";
import {
  makeOrder,
  takeMultipleOrders,
  getPrices,
  decryptWallet,
  deserializeOrder,
  matchOrders,
} from "@melonproject/melon.js";
import BigNumber from "bignumber.js";
import { types, actions } from "../actions/trade";
import { actions as appActions } from "../actions/app";
import { actions as fundActions } from "../actions/fund";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

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
        `Do you really want to place the following limit order: BUY ${buyHowMuch} of ${buyWhichToken} and SELL ${sellHowMuch} ${sellWhichToken}? If yes, please type your password below:`,
      ),
    );
    const { password } = yield take(modalTypes.CONFIRMED);
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    const limitOrder = yield call(
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
  console.log("inside saga take order ", action.values);
  const password = window.prompt("Enter your password. Yes. Really. Do IT.");
  const wallet = localStorage.getItem("wallet:melon.fund");
  const decryptedWallet = yield call(decryptWallet, wallet, password);

  try {
    yield put(appActions.transactionStarted());
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
    const priceThreshold = getPrices(selectedOrder)[theirOrderType];

    const buyOrders = yield select(state => state.orderbook.buyOrders);
    const sellOrders = yield select(state => state.orderbook.sellOrders);
    const orders =
      theirOrderType === "buy"
        ? buyOrders.map(order => deserializeOrder(order))
        : sellOrders.map(order => deserializeOrder(order));

    const matchedOrders = matchOrders(theirOrderType, priceThreshold, orders);
    const quantityAsked =
      ourOrderType === "Buy"
        ? new BigNumber(action.values.quantity)
        : new BigNumber(action.values.total);

    console.log(matchedOrders, managerAddress, fundAddress, quantityAsked);
    const marketOrder = yield call(
      takeMultipleOrders,
      decryptedWallet,
      matchedOrders,
      managerAddress,
      fundAddress,
      quantityAsked,
    );
    yield put(actions.takeOrderSucceeded());
    yield put(fundActions.infoRequested(fundAddress));
  } catch (err) {
    console.error(err);
    yield put(actions.takeOrderFailed());
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* trade() {
  yield takeLatest(types.PLACE_ORDER_REQUESTED, placeOrderSaga);
  yield takeLatest(types.TAKE_ORDER_REQUESTED, takeOrderSaga);
}

export default trade;
