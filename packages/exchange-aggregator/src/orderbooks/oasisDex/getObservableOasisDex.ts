import {
  getOrderbook,
  getParityProvider,
  getConfig,
  getSymbol,
} from '@melonproject/melon.js';
import * as Rx from 'rxjs';

const debug = require('debug')('exchange-aggregator:oasis-dex');

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);

const fetchOrderbook = options => environment => {
  const config$ = Rx.Observable.fromPromise(getConfig(environment));
  return config$.switchMap(config => {
    const baseTokenSymbol = getSymbol(config, options.baseTokenAddress);
    const quoteTokenSymbol = getSymbol(config, options.quoteTokenAddress);
    return Rx.Observable.fromPromise(
      getOrderbook(environment, { baseTokenSymbol, quoteTokenSymbol }),
    );
  });
};

const getObservableOasisDex = (baseTokenAddress, quoteTokenAddress) => {
  const environment$ = Rx.Observable.fromPromise(getParityProvider());
  const orderbook$ = environment$
    .do(value => debug('Fetching.', value))
    .switchMap(
      fetchOrderbook({
        baseTokenAddress,
        quoteTokenAddress,
      }),
    )
    .do(value => debug('Receiving values.', value))
    .distinctUntilChanged()
    .map(labelOrders)
    .do(value => debug('Emitting order book.', value));

  return orderbook$.repeatWhen(Rx.operators.delay(10000));
};

export default getObservableOasisDex;
