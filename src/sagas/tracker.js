import { takeLatest, takeEvery, call, select } from "redux-saga/effects";

import { types as appTypes } from "../actions/app";
import { types as routeTypes } from "../actions/routes";
import { types as fundTypes } from "../actions/fund";
import { types as accountTypes } from "../actions/account";
import { types as administrationTypes } from "../actions/administration";
import { types as participationTypes } from "../actions/participation";
import { types as tradeTypes } from "../actions/trade";

const findKeyByValue = (obj, byValue) =>
  (Object.entries(obj).find(([, value]) => value === byValue) || [null])[0];

function* identify() {
  const userAddress = yield select(state => state.ethereum.account);
  const fundAddress = yield select(state => state.app.usersFund);
  yield call(window.analytics.identify, userAddress, {
    fundAddress,
    userAddress,
  });
}

function* route(action) {
  yield call(window.analytics.page, action.type, {
    path: action.meta.location.current.pathname,
  });
}

const eventActionTypeMap = {
  FundCreated: fundTypes.SETUP_SUCCEEDED,
  AccountCreated: accountTypes.GENERATE_WALLET_SUCCEEDED,
  AccountRestored: accountTypes.RESTORE_FROM_MNEMONIC_SUCCEEDED,
  AccountDeleted: accountTypes.DELETE_WALLET_REQUESTED,
  SubscriptionToggled: administrationTypes.TOGGLE_REDEMPTION_SUCCEEDED,
  RedemptionToggled: administrationTypes.TOGGLE_REDEMPTION_SUCCEEDED,
  UnclaimedRewardsConverted:
    administrationTypes.CONVERT_UNCLAIMED_REWARDS_SUCCEEDED,
  FundShutdown: administrationTypes.SHUTDOWN_SUCCEEDED,
  Subscribed: participationTypes.SUBSCRIBE_SUCCEEDED,
  Redeemed: participationTypes.REDEEM_SUCCEEDED,
  ParticipationRequestExecuted: participationTypes.EXECUTE_SUCCEEDED,
  OrderPlaced: tradeTypes.PLACE_ORDER_SUCCEEDED,
  OrderTaken: tradeTypes.TAKE_ORDER_SUCCEEDED,
};

function* track(action) {
  const { type, ...payload } = action;
  const name = findKeyByValue(eventActionTypeMap, action.type);
  yield call(window.analytics.track, name, payload);
}

function* tracker() {
  yield takeLatest(appTypes.SET_USERS_FUND, identify);
  yield takeLatest(Object.values(routeTypes), route);
  yield takeEvery(Object.values(eventActionTypeMap), track);
}

export default tracker;
