import { takeLatest, call, put, select, take } from "redux-saga/effects";
import { createWallet, encryptWallet } from "@melonproject/melon.js";

import { types, actions } from "../actions/newUser";

function* generateWallet() {
  try {
    const wallet = yield call(createWallet);
    yield put(actions.generateWalletSucceeded(wallet.address, wallet.mnemonic));
    yield take(types.I_SAVED);
    const { password } = yield take(types.ENCRYPT_WALLET_REQUESTED);
    const encryptedWallet = yield call(encryptWallet, wallet, password);
    localStorage.setItem("wallet:melon.fund", encryptedWallet);
    yield put(actions.encryptWalletSucceeded());
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}

function* newUser() {
  yield takeLatest(types.GENERATE_WALLET_REQUESTED, generateWallet);
}

export default newUser;
