import { take, put, takeLatest, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { setup, onBlock, getWeb3 } from "@melonproject/melon.js";

import { types as browserTypes } from "../actions/browser";
import { actions as ethereumActions } from "../actions/ethereum";
import { actions as fundActions } from "../actions/fund";

const MAX_BLOCK_TIME = 20 * 1000;

function* init() {
  const { web3, provider } = getWeb3(window.web3);

  setup.init({
    web3,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  yield put(ethereumActions.setProvider(provider));

  if (web3.currentProvider.isConnected()) {
    const fund = yield select(state => state.fund);

    yield put(ethereumActions.hasConnected(web3.version.network));

    if (fund.address !== "" && fund.name === "-") {
      yield put(fundActions.infoRequested(fund.address));
    }

    const blockChannel = eventChannel(emitter => {
      let blockTimeout;

      const setBlockOverdue = () => {
        emitter({ blockOverdue: true });
      };

      // Immediately get infos from the latest block before watching new blocks
      onBlock(web3).then(data => emitter({ onBlock: data }));
      blockTimeout = window.setTimeout(setBlockOverdue, MAX_BLOCK_TIME);

      const filter = web3.eth.filter("latest", () => {
        onBlock(web3).then(data => emitter({ onBlock: data }));
        window.clearTimeout(blockTimeout);
        blockTimeout = window.setTimeout(setBlockOverdue, MAX_BLOCK_TIME);
      });

      return () => {
        filter.stopWatching();
      };
    });

    while (true) {
      const data = yield take(blockChannel);

      if (data.onBlock) {
        yield put(ethereumActions.newBlock(data.onBlock));

        const currentAccount = yield select(state => state.ethereum.account);

        if (currentAccount !== data.onBlock.account) {
          yield put(ethereumActions.accountChanged(data.onBlock.account));
        }
      } else {
        yield put(ethereumActions.blockOverdue());
      }
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
