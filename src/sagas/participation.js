import { takeLatest, take, select, call, put } from "redux-saga/effects";
import {
  subscribe,
  redeem,
  executeRequest,
  decryptWallet,
} from "@melonproject/melon.js";
import { delay } from "redux-saga";
import { types, actions } from "../actions/participation";
import { actions as fundActions, types as fundTypes } from "../actions/fund";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

function* subscribeSaga(action) {
  yield put(
    modalActions.confirm(
      `Do you really want to buy ${action.amount} shares for ${
        action.total
      } MLN? If yes, please type your password below:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    const fundAddress = yield select(state => state.fund.address);
    const subscription = yield call(
      subscribe,
      decryptedWallet,
      fundAddress,
      action.amount,
      action.total,
    );

    if (action.directlyExecute) {
      yield call(executeRequest, decryptedWallet, subscription.id, fundAddress);
    } else {
      yield put(fundActions.setPendingRequest(subscription.id));
    }
    yield put(actions.subscribeSucceeded());
    yield put(modalActions.close());
    yield put(fundActions.infoRequested(fundAddress));
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
    yield put(actions.subscribeFailed());
  }
}

function* redeemSaga(action) {
  yield put(
    modalActions.confirm(
      `Do you really want to sell ${action.amount} shares for ${
        action.total
      } MLN? If yes, please type your password below:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    const fundAddress = yield select(state => state.fund.address);
    const redemption = yield call(
      redeem,
      decryptedWallet,
      fundAddress,
      action.amount,
      action.total,
    );
    yield put(fundActions.setPendingRequest(redemption.id));
    yield put(actions.redeemSucceeded());
    yield put(modalActions.close());
    yield put(fundActions.infoRequested(fundAddress));
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
    yield put(actions.redeemFailed());
  }
}

function* executeSaga(action) {
  yield put(
    modalActions.confirm(
      `Type your password to execute your participation request:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);
    const fundAddress = yield select(state => state.fund.address);
    const requestId = yield select(state => state.fund.pendingRequest);

    yield call(executeRequest, decryptedWallet, requestId, fundAddress);
    yield put(actions.executeSucceeded());
    yield put(modalActions.close());
    yield put(fundActions.infoRequested(fundAddress));
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
    yield put(actions.executeFailed());
  }
}

function* waitForExecute() {
  yield delay(4 * 60 * 1000);
  // yield delay(1 * 20 * 1000);
  yield put(fundActions.setReadyToExecute());
}

function* participation() {
  yield takeLatest(types.SUBSCRIBE_REQUESTED, subscribeSaga);
  yield takeLatest(types.REDEEM_REQUESTED, redeemSaga);
  yield takeLatest(types.EXECUTE_REQUESTED, executeSaga);
  yield takeLatest(fundTypes.SET_PENDING_REQUEST, waitForExecute);
}

export default participation;
