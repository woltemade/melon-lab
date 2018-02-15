import { takeLatest, take, select, call, put } from "redux-saga/effects";
import {
  subscribe,
  redeem,
  executeRequest,
  decryptWallet,
  getEnvironment,
} from "@melonproject/melon.js";
import { delay } from "redux-saga";
import { types, actions } from "../actions/participation";
import { actions as fundActions, types as fundTypes } from "../actions/fund";
import { actions as modalActions, types as modalTypes } from "../actions/modal";
import { actions as routesActions } from "../actions/routes";
import signer from "./signer";

function* subscribeSaga(action) {
  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    const subscription = yield call(subscribe, environment, {
      fundAddress,
      numShares: action.amount,
      offeredValue: action.total,
    });

    if (action.directlyExecute) {
      yield call(executeRequest, environment, {
        requestId: subscription.id,
        fundAddress,
      });
      yield put(routesActions.fund(fundAddress));
    } else {
      yield put(fundActions.setPendingRequest(subscription.id));
    }
    yield put(actions.subscribeSucceeded());
    yield put(modalActions.close());
  }
  yield call(
    signer,
    `Do you really want to buy ${action.amount} shares for ${action.total} MLN? If yes, please type your password below:`,
    transaction,
    actions.subscribeFailed,
  );
}

function* redeemSaga(action) {
  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    const redemption = yield call(redeem, environment, {
      fundAddress,
      numShares: action.amount,
      requestedValue: action.total,
    });
    yield put(fundActions.setPendingRequest(redemption.id));
    yield put(actions.redeemSucceeded());
    yield put(modalActions.close());
  }

  yield call(
    signer,
    `Do you really want to sell ${action.amount} shares for ${action.total} MLN? If yes, please type your password below:`,
    transaction,
    actions.redeemFailed,
  );
}

function* executeSaga() {
  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    const requestId = yield select(state => state.fund.pendingRequest);

    yield call(executeRequest, environment, { requestId, fundAddress });
    yield put(actions.executeSucceeded());
    yield put(modalActions.close());
  }

  yield call(
    signer,
    transaction,
    `Type your password to execute your participation request:`,
    actions.executeFailed,
  );
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
