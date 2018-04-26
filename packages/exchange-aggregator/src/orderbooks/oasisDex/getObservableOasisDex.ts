import { getOrderbook, getParityProvider } from '@melonproject/melon.js';
import * as Rx from 'rxjs';

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);

const fetchOrderbook = options => environment =>
  Rx.Observable.fromPromise(getOrderbook(environment, options));

const getObservableOasisDex = (baseTokenSymbol, quoteTokenSymbol) => {
  const environment$ = Rx.Observable.fromPromise(getParityProvider());
  const orderbook$ = environment$
    .switchMap(
      fetchOrderbook({
        baseTokenSymbol,
        quoteTokenSymbol,
      }),
    )
    .map(labelOrders);

  return orderbook$.repeatWhen(Rx.operators.delay(10000));
};

export default getObservableOasisDex;
