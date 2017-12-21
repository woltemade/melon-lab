import { takeLatest, select, call, put } from "redux-saga/effects";
import {
  subscribe,
  redeem,
  executeRequest,
  decryptWallet,
} from "@melonproject/melon.js";
import { types, actions } from "../actions/participation";
import { actions as appActions } from "../actions/app";
import { actions as fundActions } from "../actions/fund";

function* subscribeSaga(action) {
  const password = window.prompt("Enter your password. Yes. Really. Do IT.");
  const wallet = localStorage.getItem("wallet:melon.fund");
  const decryptedWallet = yield call(decryptWallet, wallet, password);

  try {
    yield put(appActions.transactionStarted());
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
    yield put(fundActions.infoRequested(fundAddress));
  } catch (err) {
    console.error(err);
    yield put(actions.subscribeFailed());
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* redeemSaga(action) {
  const password = window.prompt("Enter your password. Yes. Really. Do IT.");
  const wallet = localStorage.getItem("wallet:melon.fund");
  const decryptedWallet = yield call(decryptWallet, wallet, password);

  try {
    yield put(appActions.transactionStarted());
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
    console.error(err);
    yield put(actions.redeemFailed());
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* participation() {
  yield takeLatest(types.SUBSCRIBE_REQUESTED, subscribeSaga);
  yield takeLatest(types.REDEEM_REQUESTED, redeemSaga);
}

export default participation;
