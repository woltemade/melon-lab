import { take, put, takeLatest, select, apply, call } from "redux-saga/effects";
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
  const { provider, providerType, api } = yield call(getParityProvider, -1);

  setup.init({
    provider,
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

    const pollBlock = async () => {
      try {
        const blockNumber = await api.eth.blockNumber();

        if (!equals(blockNumber, lastBlockNumber)) {
          const data = await onBlock();
          emitter({ onBlock: { ...data, blockNumber } });
          lastBlockNumber = blockNumber;
          intervalsSinceLastBlock = 0;
        } else {
          intervalsSinceLastBlock += 1;
        }

        if (intervalsSinceLastBlock > MAX_INTERVAL_BETWEEN_BLOCKS) {
          emitter({ blockOverdue: true });
        }
      } catch (e) {
        emitter({ blockError: true });
        console.error(e);
      }
    };

    pollBlock();
    const blockInterval = window.setInterval(pollBlock, BLOCK_POLLING_INTERVAL);

    return () => {
      window.clearInterval(blockInterval);
    };
  });

  while (true) {
    const data = yield take(blockChannel);

    if (data.onBlock) {
      yield put(ethereumActions.newBlock(data.onBlock));
    } else if (data.blockOverdue) {
      yield put(ethereumActions.blockOverdue());
    } else {
      yield put(ethereumActions.blockError());
    }
  }
}

function* ethereum() {
  yield takeLatest(browserTypes.LOADED, init);
}

export default ethereum;
