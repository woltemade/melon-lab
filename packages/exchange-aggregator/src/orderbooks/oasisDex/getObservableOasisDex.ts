import * as Rx from 'rxjs';
import * as debug from 'debug';
import { getOrderbook, getParityProvider } from '@melonproject/melon.js';

const log = debug('exchange-aggregator:oasis-dex');

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrderbooks = orderbook => orderbook.map(labelOrder);

const defaultOptions = {
  baseTokenSymbol: 'MKR-T-M',
  quoteTokenSymbol: 'MLN-T-M',
};

const getObservableOasisDex = (baseTokenAddress, quoteTokenAddress) => {
  const promiseOrderbook = environment => () =>
    Rx.Observable.fromPromise(getOrderbook(environment, defaultOptions));

  const pollOrderbook = environment =>
    Rx.Observable.interval(10000)
      .startWith(-1)
      .do(() => log('Fetching orderbook'))
      .flatMap(promiseOrderbook(environment))
      .do(() => log('Finished fetching orderbook'))
      .map(labelOrderbooks);

  const usingEnvironment = Rx.Observable.fromPromise(getParityProvider());
  return usingEnvironment.switchMap(pollOrderbook);
};

export default getObservableOasisDex;
