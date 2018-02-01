import { takeLatest, call, put, take } from "redux-saga/effects";
import {
  setup,
  createWallet,
  encryptWallet,
  importWalletFromMnemonic,
  decryptWallet,
} from "@melonproject/melon.js";
import { actions as modalActions, types as modalTypes } from "../actions/modal";
import { types, actions } from "../actions/account";
import {
  actions as ethereumActions,
  types as ethereumTypes,
} from "../actions/ethereum";
import { actions as routeActions } from "../actions/routes";

function* encryptWalletSaga(wallet, password) {
  const encryptedWallet = yield call(encryptWallet, wallet, password);
  localStorage.setItem("wallet:melon.fund", encryptedWallet);
  yield put(actions.encryptWalletSucceeded());
  yield put(ethereumActions.accountChanged(`${wallet.address}`));
  setup.wallet = JSON.parse(encryptedWallet);
  setup.defaultAccount = `0x${setup.wallet.address}`;
}

function* generateWalletSaga() {
  try {
    const wallet = yield call(createWallet);
    yield put(actions.generateWalletSucceeded(wallet.address, wallet.mnemonic));
    yield take(types.I_SAVED);
    const { password } = yield take(types.ENCRYPT_WALLET_REQUESTED);
    yield call(encryptWalletSaga, wallet, password);
    yield put(routeActions.setup());
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}
function* importWalletSaga({ mnemonic }) {
  try {
    const wallet = yield importWalletFromMnemonic(mnemonic);
    yield put(actions.restoreFromMnemonicSucceeded(wallet.address, wallet));
    yield put(routeActions.encrypt());
    const { password } = yield take(types.ENCRYPT_WALLET_REQUESTED);
    yield call(encryptWalletSaga, wallet, password);
    yield take(ethereumTypes.NEW_BLOCK);
    yield put(routeActions.setup());
  } catch (err) {
    console.error(err);
    yield put(actions.restoreFromMnemonicFailed(err));
  }
}

function* deleteWallet() {
  yield put(
    modalActions.confirm(
      `Do you really want to erase your current wallet? If yes, please type your password below:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);
  yield put(modalActions.loading());
  const wallet = localStorage.getItem("wallet:melon.fund");
  yield call(decryptWallet, wallet, password);
  localStorage.removeItem("wallet:melon.fund");
  yield put(modalActions.close());
  yield put(routeActions.ranking());
}

function* account() {
  yield takeLatest(types.GENERATE_WALLET_REQUESTED, generateWalletSaga);
  yield takeLatest(types.RESTORE_FROM_MNEMONIC_REQUESTED, importWalletSaga);
  yield takeLatest(types.DELETE_WALLET_REQUESTED, deleteWallet);
}

export default account;
