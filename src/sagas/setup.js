import { takeLatest, call, put, take, select } from "redux-saga/effects";
import {
  setupFund,
  setup as melonJsSetup,
  signTermsAndConditions,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/fund";
import { actions as appActions, types as appTypes } from "../actions/app";
import { types as routeTypes } from "../actions/routes";

function* createFund({ name }) {
  try {
    yield put(appActions.transactionStarted());
    const signature = yield call(signTermsAndConditions);
    console.log(signature);
    const fund = yield call(setupFund, name, signature);
    yield put(
      actions.setupSucceeded({ ...fund, owner: melonJsSetup.defaultAccount }),
    );
  } catch (err) {
    console.error(err);
    yield put(actions.setupFailed(err));
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* loadFundOnSetup() {
  const usersFundChecked = yield select(state => state.app.usersFundChecked);

  if (!usersFundChecked) {
    yield take(appTypes.SET_USERS_FUND);
  }

  const usersFund = yield select(state => state.app.usersFund);

  if (usersFund) {
    yield put(actions.infoRequested(usersFund));
  }
}

function* setup() {
  yield takeLatest(types.SETUP_REQUESTED, createFund);
  yield takeLatest(routeTypes.SETUP, loadFundOnSetup);
}

export default setup;
