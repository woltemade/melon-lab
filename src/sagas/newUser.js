import { takeLatest, call, put, select } from "redux-saga/effects";
import { createWallet, encryptWallet } from "@melonproject/melon.js";

import { types, actions } from "../actions/newUser";
import { actions as appActions } from "../actions/app";

function* generateWallet() {
  try {
    const wallet = yield call(createWallet);
    yield put(actions.generateWalletSucceeded({ wallet, hasGenerated: true }));
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}

function* encrypt() {
  try {
    const wallet = yield select(state => state.newUser.wallet);
    const password = "asdf";
    const encryptedWallet = yield call(encryptWallet, wallet, password);
    localStorage.setItem("Wallet", encryptedWallet);
    yield put(
      actions.encryptWalletSucceeded({ encryptedWallet, hasEncrypted: true }),
    );
  } catch (err) {
    console.error(err);
    yield put(actions.encryptWalletFailed(err));
  }
}

function* newUser() {
  yield takeLatest(types.GENERATE_WALLET_REQUESTED, generateWallet);
  yield takeLatest(types.ENCRYPT_WALLET_REQUESTED, encrypt);
}

export default newUser;
