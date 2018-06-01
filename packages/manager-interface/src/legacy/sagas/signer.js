import { call, put, take, select, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import {
  getEnvironment,
  getWallet,
  isExternalSigner,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';

function* confirmer(environment, modalSentence) {
  const confirmChannel = eventChannel(emitter => {
    environment.confirmer = matter =>
      new Promise(resolve => {
        emitter({ matter, resolve });
        emitter(END);
      });

    return () => emitter(END);
  });

  const { matter, resolve } = yield take(confirmChannel);

  /*
  yield put(
    modalActions.confirm(
      `${modalSentence} \n\n ${JSON.stringify(matter, null, 4)}`,
    ),
  );

  // This leads to a Maximum Call Stack error :(
  const action = yield take([modalTypes.CONFIRMED, modalTypes.CANCEL]);

  if (action.type === modalTypes.CANCEL) return resolve(false);

  return resolve(true);
  */

  return resolve(
    confirm(`${modalSentence} \n\n ${JSON.stringify(matter, null, 4)}`),
  );
}

function* signer(modalSentence, transaction, failureAction) {
  try {
    const environment = getEnvironment();
    yield put(modalActions.loading());

    if (!isExternalSigner(environment)) {
      yield put(modalActions.loading());

      // The wallet gets attached to the environment for only this transaction
      // for security reasons
      const privateKey = yield select(state => state.wallet.privateKey);
      environment.account = getWallet(privateKey);

      yield fork(confirmer, environment, modalSentence);
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
