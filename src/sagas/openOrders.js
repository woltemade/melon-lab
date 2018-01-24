import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { getOpenOrders } from "@melonproject/melon.js";
import { actions, types } from "../actions/openOrders";
import { types as ethereumTypes } from "../actions/ethereum";

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

function* openOrders() {
  yield takeLatest(types.GET_OPEN_ORDERS_REQUESTED, getOpenOrdersSaga);
}

export default openOrders;
