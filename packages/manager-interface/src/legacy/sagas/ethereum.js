import { take, put, takeLatest, select, apply, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  getConfig,
  onBlock,
  getParityProvider,
  providers,
  setEnvironment,
  getEnvironment,
} from '@melonproject/melon.js';
import { utils } from 'ethers';

import { types as browserTypes } from '../actions/browser';
import { actions as appActions } from '../actions/app';
import { actions as ethereumActions } from '../actions/ethereum';
import { actions as fundActions } from '../actions/fund';
import { equals } from '../utils/functionalBigNumber';

const BLOCK_POLLING_INTERVAL = 4 * 1000;
const MAX_INTERVAL_BETWEEN_BLOCKS = 5;

function* init() {
  const { providerType, api } = yield call(getParityProvider);

  // TODO: add tracer
  setEnvironment({ api, providerType });
  yield put(ethereumActions.setProvider(providerType));

  const config = yield call(getConfig, { api, providerType });
  global.MELON_PROTOCOL_CONFIG = config;
  yield put(fundActions.setConfig(config));
  yield put(
    appActions.updateAssetPair({
      base: 'MLN-T',
      quote: config.quoteAssetSymbol,
    }),
  );

  // Reading the fund address from the URL
  const fund = yield select(state => state.fund);
  const networkId = yield apply(api, api.net.version);

  yield put(ethereumActions.hasConnected(networkId));

  if (fund.address !== '' && fund.name === '-') {
    yield put(fundActions.infoRequested(fund.address));
  }

  const blockChannel = eventChannel(emitter => {
    let lastBlockNumber;
    let intervalsSinceLastBlock = 0;

    const pollBlock = async () => {
      try {
        const blockNumber = await api.eth.blockNumber();

        if (!equals(blockNumber, lastBlockNumber)) {
          const environment = getEnvironment();
          const data = await onBlock(environment);
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
    const blockInterval = setInterval(pollBlock, BLOCK_POLLING_INTERVAL);

    return () => {
      clearInterval(blockInterval);
    };
  });

  while (true) {
    const data = yield take(blockChannel);
    if (data.onBlock) {
      yield put(
        ethereumActions.newBlock({
          ...data.onBlock,
          mlnBalance: data.onBlock.melonBalance,
          ethBalance: data.onBlock.etherBalance,
        }),
      );
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
