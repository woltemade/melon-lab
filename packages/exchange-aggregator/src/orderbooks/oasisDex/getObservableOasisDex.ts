import * as Rx from 'rxjs';
import { getOrderbook, getParityProvider } from '@melonproject/melon.js';

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });

const getObservableOasisDex = (baseTokenAddress, quoteTokenAddress) => {
  return Rx.Observable.fromPromise(getParityProvider()).switchMap(environment =>
    Rx.Observable.interval(10000)
      .startWith(-1)
      .flatMap(() =>
        Rx.Observable.fromPromise(
          getOrderbook(environment, {
            baseTokenSymbol: 'MKR-T-M',
            quoteTokenSymbol: 'MLN-T-M',
          }),
        ).map(orderbook => orderbook.map(labelOrder)),
      ),
  );
};

export default getObservableOasisDex;
