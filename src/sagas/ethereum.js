import { take, put, takeLatest, select, apply } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { setup, onBlock, getParityProvider } from "@melonproject/melon.js";
import { utils } from "ethers";

import { types as browserTypes } from "../actions/browser";
import { actions as ethereumActions } from "../actions/ethereum";
import { actions as fundActions } from "../actions/fund";
import { equals } from "../utils/functionalBigNumber";

const BLOCK_POLLING_INTERVAL = 4 * 1000;
const MAX_INTERVAL_BETWEEN_BLOCKS = 5;

function* init() {
  const { provider, providerType, api } = getParityProvider(-1);

  setup.init({
    provider,
    daemonAddress: "0x00360d2b7D240Ec0643B6D819ba81A09e40E5bCd",
  });

  yield put(ethereumActions.setProvider(providerType));

  // Reading the fund address from the URL
  const fund = yield select(state => state.fund);
  const networkId = yield apply(api, api.net.version);

  yield put(ethereumActions.hasConnected(networkId));

  // TEST Mnemonic: "galaxy arrange tower sentence gift hub pony butter inner critic vessel echo"
  const wallet = localStorage.getItem("wallet:melon.fund");

  if (wallet) {
    setup.wallet = JSON.parse(wallet);
    const address = utils.getAddress(setup.wallet.address);
    setup.defaultAccount = address;
    yield put(ethereumActions.accountChanged(address));
  } else {
    yield put(ethereumActions.accountChanged(""));
  }

  if (fund.address !== "" && fund.name === "-") {
    yield put(fundActions.infoRequested(fund.address));
  }

  const blockChannel = eventChannel(emitter => {
    let lastBlockNumber;
    let intervalsSinceLastBlock = 0;

    // Immediately get infos from the latest block before watching new blocks
    onBlock().then(data => {
      lastBlockNumber = data.blockNumber;
      emitter({ onBlock: data });
    });

    const blockInterval = window.setInterval(async () => {
      try {
        const blockNumber = await api.eth
          .getBlockByNumber()
          .then(block => block.number);

        if (!equals(blockNumber, lastBlockNumber)) {
          const data = await onBlock();
          emitter({ onBlock: data });
          lastBlockNumber = blockNumber;
          intervalsSinceLastBlock = 0;
        } else {
          intervalsSinceLastBlock += 1;
        }

        if (intervalsSinceLastBlock > MAX_INTERVAL_BETWEEN_BLOCKS) {
          emitter({ blockOverdue: true });
        }
      } catch (e) {
        emitter({ blockOverdue: true });
        console.error(e);
      }
    }, BLOCK_POLLING_INTERVAL);

    return () => {
      console.log("stop");
      window.clearInterval(blockInterval);
    };
  });

  while (true) {
    const data = yield take(blockChannel);

    if (data.onBlock) {
      yield put(ethereumActions.newBlock(data.onBlock));
    } else {
      yield put(ethereumActions.blockOverdue());
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
