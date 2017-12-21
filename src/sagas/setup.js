import { takeLatest, call, put, take, select } from "redux-saga/effects";
import {
  setupFund,
  setup as melonJsSetup,
  signTermsAndConditions,
  decryptWallet
} from "@melonproject/melon.js";

import { types, actions } from "../actions/fund";
import { actions as appActions, types as appTypes } from "../actions/app";
import {
  types as routeTypes,
  actions as routeActions
} from "../actions/routes";

function* createFund({ name }) {
  const password = window.prompt("Enter your password. Yes. Really. Do IT.");
  const wallet = localStorage.getItem("wallet:melon.fund");

  try {
    yield put(appActions.transactionStarted());
    const decryptedWallet = yield call(decryptWallet, wallet, password);
    const signature = yield call(signTermsAndConditions, decryptedWallet);
    const fund = yield call(setupFund, name, signature, decryptedWallet);
    yield put(
      actions.setupSucceeded({ ...fund, owner: melonJsSetup.defaultAccount })
    );
    yield put(appActions.setUsersFund(fund.address));
    yield put(actions.infoRequested(fund.address));
  } catch (err) {
    console.error(err);
    yield put(actions.setupFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* loadFundOnSetup() {
  const usersFundChecked = yield select(state => state.app.usersFundChecked);
  if (!usersFundChecked) yield take(appTypes.SET_USERS_FUND);

  const hasAccount = yield select(state => !!state.ethereum.account);
  const usersFund = yield select(state => state.app.usersFund);

  if (!hasAccount) {
    yield put(routeActions.account());
  } else if (usersFund) {
    yield put(actions.infoRequested(usersFund));
  }
}

function* setup() {
  yield takeLatest(types.SETUP_REQUESTED, createFund);
  yield takeLatest(routeTypes.SETUP, loadFundOnSetup);
}

export default setup;
