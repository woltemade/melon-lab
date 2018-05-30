import { takeLatest, call, put, take, select } from 'redux-saga/effects';
import {
  getWallet,
  createWallet,
  encryptWallet,
  importWalletFromMnemonic,
  decryptWallet,
  setEnvironment,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';
import { types, actions } from '../actions/wallet';
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

// from https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
const createDownload = (data, filename, mime) => {
  var blob = new Blob([data], { type: mime || 'application/octet-stream' });

  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL = window.URL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
};

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
    yield put(routeActions.wallet());
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

function* downloadJSON() {
  yield put(
    modalActions.password(
      `Please type a strong password to encrypt your wallet JSON with:`,
    ),
  );
  const { password } = yield take(modalTypes.PASSWORD_ENTERED);

  if (password.length < 8) {
    yield put(
      modalActions.error(
        'Password needs to be at least 8 chars long. For your security!',
      ),
    );
    return;
  }

  yield put(modalActions.password(`Confirm password:`));
  const { password: confirm } = yield take(modalTypes.PASSWORD_ENTERED);

  if (password !== confirm) {
    yield put(modalActions.error("The entered passwords didn't match"));
    return;
  }

  yield put(modalActions.loading());
  const privateKey = yield select(state => state.wallet.privateKey);
  const address = yield select(state => state.ethereum.account);
  const wallet = getWallet(privateKey);
  const encryptedWallet = yield call(encryptWallet, wallet, password);

  createDownload(
    encryptedWallet,
    `olympiad.melon.fund-${address}.json`,
    'application/json',
  );

  yield put(modalActions.close());
}

function* importWallet({ encryptedWalletString }) {
  try {
    yield put(
      modalActions.password(
        `Enter the password this wallet is encrypted with:`,
      ),
    );

    const { password } = yield take(modalTypes.PASSWORD_ENTERED);
    yield put(modalActions.loading('Decrypting ...'));
    const decryptedWallet = yield call(
      decryptWallet,
      encryptedWalletString,
      password,
    );
    yield put(actions.importWalletSucceeded(decryptedWallet));
    yield put(ethereumActions.accountChanged(`${decryptedWallet.address}`));
    yield put(routeActions.wallet());
    yield put(modalActions.close());
  } catch (e) {
    console.error(e);
    yield put(actions.importWalletFailed(e));
    yield put(modalActions.error('Failed to decrypt wallet. Wrong password?'));
  }
}

function* wallet() {
  yield takeLatest(types.RESTORE_FROM_MNEMONIC_REQUESTED, restoreWalletSaga);
  yield takeLatest(types.DELETE_WALLET_REQUESTED, deleteWallet);
  yield takeLatest(types.IMPORT_WALLET_REQUESTED, importWallet);
  yield takeLatest(types.DOWNLOAD_JSON, downloadJSON);
  yield takeLatest(routeTypes.WALLET_GENERATE, generateMnemonic);
}

export default wallet;
