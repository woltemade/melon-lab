import { takeLatest, call, put, select, take } from "redux-saga/effects";
import {
  createWallet,
  encryptWallet,
  importWalletFromMnemonic,
} from "@melonproject/melon.js";

import { types, actions } from "../actions/account";

function* encryptWalletSaga(wallet, password) {
  const encryptedWallet = yield call(encryptWallet, wallet, password);
  localStorage.setItem("wallet:melon.fund", encryptedWallet);
  yield put(actions.encryptWalletSucceeded());
}

function* importWalletSaga({mnemonic}) {
  try {
    const wallet = importWalletFromMnemonic(mnemonic);
    // yield put(actions.)
    // yield call(encryptWalletSaga, wallet, )
  } catch (err) {
    console.error(err);
  }
}

function* generateWallet() {
  try {
    const wallet = yield call(createWallet);
    yield put(actions.generateWalletSucceeded(wallet.address, wallet.mnemonic));
    yield take(types.I_SAVED);
    const { password } = yield take(types.ENCRYPT_WALLET_REQUESTED);
    yield call(encryptWalletSaga, wallet, password);
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}

function* account() {
  yield takeLatest(types.GENERATE_WALLET_REQUESTED, generateWallet);
}

export default account;
