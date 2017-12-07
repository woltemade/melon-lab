import { take, put, takeLatest, select, apply } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  setup,
  onBlock,
  getParityProvider,
  importWallet,
} from "@melonproject/melon.js";

import { types as browserTypes } from "../actions/browser";
import { actions as ethereumActions } from "../actions/ethereum";
import { actions as fundActions } from "../actions/fund";

const MAX_BLOCK_TIME = 20 * 1000;

function* init() {
  const { provider, providerType, api } = getParityProvider();

  setup.init({
    provider,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  yield put(ethereumActions.setProvider(providerType));

  // Reading the fund address from the URL
  const fund = yield select(state => state.fund);
  const networkId = yield apply(api, api.net.version);

  yield put(ethereumActions.hasConnected(networkId));

  // TODO: Real functionality which can create a new wallet if needed
  setup.wallet = importWallet(
    "ability ensure nasty lazy final guess private electric eyebrow oil noise ritual",
  );

  setup.defaultAccount = setup.wallet.address;

  console.log(setup);

  if (fund.address !== "" && fund.name === "-") {
    yield put(fundActions.infoRequested(fund.address));
  }

  const blockChannel = eventChannel(emitter => {
    let blockTimeout;

    const setBlockOverdue = () => {
      emitter({ blockOverdue: true });
    };

    // Immediately get infos from the latest block before watching new blocks
    onBlock().then(data => emitter({ onBlock: data }));
    blockTimeout = window.setTimeout(setBlockOverdue, MAX_BLOCK_TIME);

    /*
    const filter = web3.eth.filter("latest", () => {
      onBlock().then(data => emitter({ onBlock: data }));
      window.clearTimeout(blockTimeout);
      blockTimeout = window.setTimeout(setBlockOverdue, MAX_BLOCK_TIME);
    });

    return () => {
      filter.stopWatching();
    };
    */
    return () => {};
  });

  while (true) {
    const data = yield take(blockChannel);

    if (data.onBlock) {
      const currentAccount = yield select(state => state.ethereum.account);

      yield put(ethereumActions.newBlock(data.onBlock));

      if (currentAccount !== data.onBlock.account) {
        yield put(ethereumActions.accountChanged(data.onBlock.account));
      }
    } else {
      yield put(ethereumActions.blockOverdue());
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
