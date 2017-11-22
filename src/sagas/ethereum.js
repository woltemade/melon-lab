import { take, put, takeLatest } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { setup, onBlock, getWeb3 } from "@melonproject/melon.js";

import { types as browserTypes } from "../actions/browser";
import { actions as ethereumActions } from "../actions/ethereum";

function* init() {
  const { web3, provider } = getWeb3(window.web3);

  setup.init({
    web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  yield put(ethereumActions.setProvider(provider));

  if (web3.currentProvider.isConnected()) {
    yield put(ethereumActions.hasConnected(web3.version.network));

    const blockChannel = eventChannel(emitter => {
      // Immediately get infos from the latest block before watching new blocks
      onBlock(web3).then(data => emitter(data));

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
      yield put(ethereumActions.newBlock(data));
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
