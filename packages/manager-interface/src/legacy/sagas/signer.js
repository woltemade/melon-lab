import { call, put, take, select } from 'redux-saga/effects';
import {
  getEnvironment,
  getWallet,
  isExternalSigner,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';

function* signer(modalSentence, transaction, failureAction) {
  try {
    const environment = getEnvironment();
    yield put(modalActions.loading());

    if (!isExternalSigner(environment)) {
      yield put(modalActions.confirm(modalSentence));
      yield take(modalTypes.CONFIRMED);
      yield put(modalActions.loading());
      const privateKey = yield select(state => state.wallet.privateKey);
      const wallet = getWallet(privateKey);

      // The wallet gets attached to the environment only this transaction
      // For security reasons
      environment.account = wallet;
    }
    yield call(transaction, environment);
  } catch (err) {
    if (err.name === 'EnsureError') {
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
