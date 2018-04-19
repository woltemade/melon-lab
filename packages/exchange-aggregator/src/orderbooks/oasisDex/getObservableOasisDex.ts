import * as Rx from 'rxjs';
import { getOrderbook, getParityProvider } from '@melonproject/melon.js';

const getObservableOasisDex = (baseTokenAddress, quoteTokenAddress) => {
  return Rx.Observable.create(async observer => {
    const environment = await getParityProvider();
    observer.next(
      await getOrderbook(environment, {
        baseTokenSymbol: 'MKR-T-M',
        quoteTokenSymbol: 'MLN-T-M',
      }),
    );

    console.log(
      await getOrderbook(environment, {
        baseTokenSymbol: 'MKR-T-M',
        quoteTokenSymbol: 'MLN-T-M',
      }),
    );

    ///

    const interval = setInterval(
      async () =>
        observer.next(
          await getOrderbook(environment, {
            baseTokenSymbol: 'MKR-T-M',
            quoteTokenSymbol: 'MLN-T-M',
          }),
        ),
      10 * 1000,
    );

    return () => clearInterval(interval);
  });

  // return Rx.Observable.defer(async () => {
  //   console.log('asdf');
  //   const environment = await getParityProvider();
  //   console.log(environment, '1');

  //   return Rx.Observable.interval(5000)
  //     .startWith(-1)
  //     .flatMap(() => {
  //       console.log(environment);
  //       return Rx.Observable.fromPromise(
  //         getOrderbook(environment, 'MKR-T-M', 'MLN-T-M'),
  //       );
  //     });
  // });
};

export default getObservableOasisDex;
