import { takeLatest, call, put, select } from "redux-saga/effects";

import {
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutDownFund,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/administration";
import { actions as modalActions } from "../actions/modal";
import { actions as routeActions } from "../actions/routes";
import signer from "./signer";

function* toggleSubscriptionSaga() {
  const subscriptionAllowed = yield select(
    state => state.fund.subscriptionAllowed,
  );

  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    yield call(toggleSubscription, environment, { fundAddress });
    yield put(modalActions.close());
    yield put(actions.toggleSubscriptionSucceeded(!subscriptionAllowed));
  }

  yield call(
    signer,
    `Do you really want to ${subscriptionAllowed
      ? "disable"
      : "enable"} subscriptions? If yes, please type your password below:`,
    transaction,
    actions.toggleSubscriptionFailed,
  );
}

function* toggleRedemptionSaga() {
  const redemptionAllowed = yield select(
    state => state.fund.subscriptionAllowed,
  );

  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    yield call(toggleRedemption, environment, { fundAddress });
    yield put(modalActions.close());
    yield put(actions.toggleRedemptionSucceeded(!redemptionAllowed));
  }

  yield call(
    signer,
    `Do you really want to ${redemptionAllowed
      ? "disable"
      : "enable"} redemptions? If yes, please type your password below:`,
    transaction,
    actions.toggleRedemptionFailed,
  );
}

function* convertUnclaimedRewardsSaga() {
  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    yield call(convertUnclaimedRewards, environment, { fundAddress });
    yield put(modalActions.close());
    yield put(actions.convertUnclaimedRewardsSucceeded());
  }

  yield call(
    signer,
    `Do you really want to convert your unclaimed rewards? If yes, please type your password below:`,
    transaction,
    actions.convertUnclaimedRewardsFailed,
  );
}

function* shutDownFundSaga() {
  function* transaction(environment) {
    const fundAddress = yield select(state => state.fund.address);
    yield call(shutDownFund, environment, { fundAddress });
    yield put(modalActions.close());
    yield put(actions.shutdownSucceeded());
    yield put(routeActions.ranking());
  }

  yield call(
    signer,
    `Do you really want to shut down your fund? If yes, please type your password below:`,
    transaction,
    actions.shutdownFailed,
  );
}

function* administration() {
  yield takeLatest(types.TOGGLE_SUBSCRIPTION_REQUESTED, toggleSubscriptionSaga);
  yield takeLatest(types.TOGGLE_REDEMPTION_REQUESTED, toggleRedemptionSaga);
  yield takeLatest(
    types.CONVERT_UNCLAIMED_REWARDS_REQUESTED,
    convertUnclaimedRewardsSaga,
  );
  yield takeLatest(types.SHUTDOWN_REQUESTED, shutDownFundSaga);
}

export default administration;
