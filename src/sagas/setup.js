import { takeLatest, call, put, take, select } from "redux-saga/effects";
import {
  setupFund,
  setup as melonJsSetup,
  signTermsAndConditions,
  decryptWallet,
} from "@melonproject/melon.js";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

import { types, actions } from "../actions/fund";
import { actions as appActions, types as appTypes } from "../actions/app";
import {
  types as routeTypes,
  actions as routeActions,
} from "../actions/routes";

function* sign() {
  yield put(
    modalActions.confirm(
      `Please enter your password below to sign the terms and conditions:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);
    yield call(signTermsAndConditions, decryptedWallet);
    yield put(actions.signSucceeded());
    yield put(modalActions.close());
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
    yield put(actions.signFailed(err));
  }
}

function* createFund({ name }) {
  yield put(
    modalActions.confirm(
      `Please enter your password below to setup your fund with the name ${name} and to sign our terms and conditions:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);
    const signature = yield call(signTermsAndConditions, decryptedWallet);
    const fund = yield call(setupFund, decryptedWallet, name, signature);
    yield put(
      actions.setupSucceeded({ ...fund, owner: melonJsSetup.defaultAccount }),
    );
    yield put(appActions.setUsersFund(fund.address));
    yield put(modalActions.close());
    yield put(actions.infoRequested(fund.address));
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
    yield put(actions.setupFailed(err));
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
  yield takeLatest(types.SIGN_REQUESTED, sign);
  yield takeLatest(types.SETUP_REQUESTED, createFund);
  yield takeLatest(routeTypes.SETUP, loadFundOnSetup);
}

export default setup;
