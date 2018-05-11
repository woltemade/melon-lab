import { takeLatest, call, put, take } from 'redux-saga/effects';
import {
  createWallet,
  encryptWallet,
  importWalletFromMnemonic,
  decryptWallet,
  setEnvironment,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';
import { types, actions } from '../actions/account';
import {
  actions as ethereumActions,
  types as ethereumTypes,
} from '../actions/ethereum';
import {
  actions as routeActions,
  types as routeTypes,
} from '../actions/routes';

// function* encryptWalletSaga(wallet, password) {
//   const encryptedWallet = yield call(encryptWallet, wallet, password);
//   localStorage.setItem('wallet:melon.fund', encryptedWallet);
//   yield put(actions.encryptWalletSucceeded());
//   yield put(ethereumActions.accountChanged(`${wallet.address}`));
//   setEnvironment({ account: JSON.parse(encryptedWallet) });
// }

function* generateMnemonic() {
  try {
    yield put(actions.generateWalletSucceeded(createWallet().mnemonic));
  } catch (err) {
    console.error(err);
    yield put(actions.generateWalletFailed(err));
  }
}

function* restoreWalletSaga({ mnemonic }) {
  try {
    const wallet = yield importWalletFromMnemonic(mnemonic);
    yield put(actions.restoreFromMnemonicSucceeded(wallet));
    yield put(routeActions.account());
    yield put(ethereumActions.accountChanged(`${wallet.address}`));
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
  yield take(modalTypes.CONFIRMED);
  yield put(actions.doDeleteWallet());
  yield put(ethereumActions.accountChanged());
  yield put(routeActions.root());
}

function* account() {
  yield takeLatest(types.RESTORE_FROM_MNEMONIC_REQUESTED, restoreWalletSaga);
  yield takeLatest(types.DELETE_WALLET_REQUESTED, deleteWallet);
  yield takeLatest(routeTypes.ACCOUNT_GENERATE, generateMnemonic);
}

export default account;
