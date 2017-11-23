import { takeLatest, call, put } from "redux-saga/effects";
import { setupFund } from "@melonproject/melon.js";

import { types, actions } from "../actions/fund";

function* createFund({ name }) {
  try {
    const fund = yield call(setupFund, name);
    yield put(actions.setupSucceeded(fund));
  } catch (err) {
    console.error(err);
    yield put(actions.setupFailed(err));
  }
}

function* setup() {
  yield takeLatest(types.SETUP_REQUESTED, createFund);
}

export default setup;
