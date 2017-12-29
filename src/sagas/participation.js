import { takeLatest, take, select, call, put } from "redux-saga/effects";
import {
  subscribe,
  redeem,
  executeRequest,
  decryptWallet,
} from "@melonproject/melon.js";
import { types, actions } from "../actions/participation";
import { actions as fundActions } from "../actions/fund";
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
    yield call(executeRequest, decryptedWallet, subscription.id, fundAddress);
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
    yield call(executeRequest, decryptedWallet, redemption.id, fundAddress);
    yield put(actions.redeemSucceeded());
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

function* participation() {
  yield takeLatest(types.SUBSCRIBE_REQUESTED, subscribeSaga);
  yield takeLatest(types.REDEEM_REQUESTED, redeemSaga);
}

export default participation;
