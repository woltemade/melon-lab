import { call, put, take } from 'redux-saga/effects';
import {
  decryptWallet,
  getEnvironment,
  isExternalSigner,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';

function* signer(modalSentence, transaction, failureAction) {
  try {
    const environment = getEnvironment();
    yield put(modalActions.loading());
    if (!isExternalSigner(environment)) {
      yield put(modalActions.confirm(modalSentence));
      const { password } = yield take(modalTypes.PASSWORD_ENTERED);
      yield put(modalActions.loading());
      const wallet = localStorage.getItem('wallet:melon.fund');
      const decryptedWallet = yield call(decryptWallet, wallet, password);
      environment.account = decryptedWallet;
    }
    yield call(transaction, environment);
  } catch (err) {
    if (err.name === 'password') {
      yield put(modalActions.error('Wrong password'));
    } else if (err.name === 'EnsureError') {
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(failureAction(err));
  }
}

export default signer;
