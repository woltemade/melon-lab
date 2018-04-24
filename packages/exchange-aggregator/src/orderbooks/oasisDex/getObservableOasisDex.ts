import * as Rx from 'rxjs';
import { getOrderbook, getParityProvider } from '@melonproject/melon.js';

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);
const defaultOptions = {
  baseTokenSymbol: 'MKR-T-M',
  quoteTokenSymbol: 'MLN-T-M',
};

const fetchOrderbook = options => environment =>
  Rx.Observable.fromPromise(getOrderbook(environment, options));

const getObservableOasisDex = (baseTokenAddress, quoteTokenAddress) => {
  const environment$ = Rx.Observable.fromPromise(getParityProvider());
  const orderbook$ = environment$
    .switchMap(fetchOrderbook(defaultOptions))
    .map(labelOrders);

  return orderbook$.repeatWhen(Rx.operators.delay(10000));
};

export default getObservableOasisDex;
