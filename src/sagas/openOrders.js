import { takeLatest, call, put, select, take } from "redux-saga/effects";
import {
  decryptWallet,
  getOpenOrders,
  cancelOrder,
} from "@melonproject/melon.js";
import { actions, types } from "../actions/openOrders";
import { types as ethereumTypes } from "../actions/ethereum";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

function* getOpenOrdersSaga() {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const fundAddress = yield select(state => state.fund.address);

  try {
    const orders = yield call(getOpenOrders, fundAddress);

    yield put(
      actions.getOpenOrdersSucceeded({
        orders,
      }),
    );
  } catch (err) {
    console.error(err);
    yield put(actions.getOpenOrdersFailed(err));
  }
}

function* cancelOrderSaga({ orderIndex, orderId }) {
  const isConnected = yield select(state => state.ethereum.isConnected);
  if (!isConnected) yield take(ethereumTypes.HAS_CONNECTED);

  const fundAddress = yield select(state => state.fund.address);

  try {
    yield put(
      modalActions.confirm(
        `Do you really want to cancel the following limit order #${orderId} ?`,
      ),
    );
    const { password } = yield take(modalTypes.CONFIRMED);
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    const canceled = yield call(
      cancelOrder,
      decryptedWallet,
      orderIndex,
      fundAddress,
    );
    yield put(actions.cancelOrderSucceeded());
    yield put(modalActions.close());
  } catch (err) {
    console.error(err);
    yield put(modalActions.error(err.message));
    yield put(actions.cancelOrderFailed(err));
  }
}

function* openOrders() {
  yield takeLatest(types.GET_OPEN_ORDERS_REQUESTED, getOpenOrdersSaga);
  yield takeLatest(types.CANCEL_ORDER_REQUESTED, cancelOrderSaga);
  yield takeLatest(types.CANCEL_ORDER_SUCCEEDED, getOpenOrdersSaga);
}

export default openOrders;
