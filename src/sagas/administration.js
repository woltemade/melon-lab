import { takeLatest, call, put, select, take } from "redux-saga/effects";

import {
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutDownFund,
  decryptWallet,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/administration";
import { actions as appActions } from "../actions/app";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

function* toggleSubscriptionSaga() {
  const subscriptionAllowed = yield select(
    state => state.fund.subscriptionAllowed,
  );
  yield put(
    modalActions.confirm(
      `Do you really want to buy ${
        subscriptionAllowed ? "disable" : "enable"
      } subscriptions? If yes, please type your password below:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);
    const address = yield select(state => state.fund.address);
    yield call(toggleSubscription, decryptedWallet, address);
    yield put(modalActions.close());
    yield put(actions.toggleSubscriptionSucceeded(!subscriptionAllowed));
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
    yield put(actions.toggleSubscriptionFailed(err));
  }
}

function* toggleRedemptionSaga() {
  try {
    yield put(appActions.transactionStarted());
    const address = yield select(state => state.fund.address);
    const redemptionAllowed = yield call(toggleRedemption, address);
    yield put(actions.toggleRedemptionSucceeded(redemptionAllowed));
  } catch (err) {
    console.error(err);
    yield put(actions.toggleRedemptionFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* convertUnclaimedRewardsSaga() {
  try {
    yield put(appActions.transactionStarted());
    const address = yield select(state => state.fund.address);
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

function* shutDownFundSaga() {
  try {
    yield put(appActions.transactionStarted());
    const address = yield select(state => state.fund.address);
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
