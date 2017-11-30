import { takeLatest, call, put } from "redux-saga/effects";

import {
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutDownFund,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/administration";
import { actions as appActions } from "../actions/app";

function* toggleSubscriptionSaga({ address }) {
  try {
    yield put(appActions.transactionStarted());
    const subscriptionAllowed = yield call(toggleSubscription, address);
    yield put(actions.toggleSubscriptionSucceeded(subscriptionAllowed));
  } catch (err) {
    console.error(err);
    yield put(actions.toggleSubscriptionFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* toggleRedemptionSaga({ address }) {
  try {
    yield put(appActions.transactionStarted());
    const redemptionAllowed = yield call(toggleRedemption, address);
    yield put(actions.toggleRedemptionSucceeded(redemptionAllowed));
  } catch (err) {
    console.error(err);
    yield put(actions.toggleRedemptionFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* convertUnclaimedRewardsSaga({ address }) {
  try {
    yield put(appActions.transactionStarted());
    // TODO: Check if it succeeded
    yield call(convertUnclaimedRewards, address);
    yield put(actions.convertUnclaimedRewardsSucceeded());
  } catch (err) {
    console.error(err);
    yield put(actions.convertUnclaimedRewardsFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* shutDownFundSaga({ address }) {
  try {
    yield put(appActions.transactionStarted());
    // TODO: Check if it succeeded
    yield call(shutDownFund, address);
    yield put(actions.shutdownSucceeded());
  } catch (err) {
    console.error(err);
    yield put(actions.shutdownFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
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
