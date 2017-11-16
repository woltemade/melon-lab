import pify from "pify";
import { mergeAll } from "ramda";

import { take, put, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { setup } from "@melonproject/melon.js";

import { types as browserTypes } from "../actions/browser";
import { creators as ethereumCreators } from "../actions/ethereum";

import getWeb3 from "../utils/getWeb3";

const resolvePromiseObject = async obj => {
  const promises = Object.keys(obj).map(
    key =>
      obj[key] instanceof Promise
        ? obj[key].then(resolved => ({ [key]: resolved }))
        : new Promise(resolve => resolve({ [key]: obj[key] })),
  );

  const resolved = await Promise.all(promises);
  return mergeAll(resolved);
};

const onBlock = async web3 => {
  const info = await resolvePromiseObject({
    blockNumber: pify(web3.eth.getBlockNumber)(),
    syncing: pify(web3.eth.getSyncing)().then(syncing => !!syncing),
    account: pify(web3.eth.getAccounts)().then(accounts => accounts[0]),
  });

  info.balance = info.account
    ? await pify(web3.eth.getBalance)(info.account).then(balance =>
        web3.fromWei(balance),
      )
    : null;
  info.network = web3.version.network;

  return info;
};

function* init() {
  const { web3, provider } = getWeb3();

  setup.init({
    web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  yield put(ethereumCreators.setProvider(provider));

  if (web3.currentProvider.isConnected()) {
    yield put(ethereumCreators.hasConnected(web3.version.network));

    const blockChannel = eventChannel(emitter => {
      const filter = web3.eth.filter("latest", () => {
        onBlock(web3).then(data => emitter(data));
      });

      return () => {
        filter.stopWatching();
      };
    });

    while (true) {
      const data = yield take(blockChannel);
      if (!data) {
        break;
      }
      yield put(ethereumCreators.newBlock(data));
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
