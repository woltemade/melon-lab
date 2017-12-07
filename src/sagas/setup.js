import { takeLatest, call, put } from "redux-saga/effects";
import {
  setupFund,
  setup as melonJsSetup,
  signTermsAndConditions,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/fund";
import { actions as appActions } from "../actions/app";

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

function* setup() {
  yield takeLatest(types.SETUP_REQUESTED, createFund);
}

export default setup;
