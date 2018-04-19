import * as Rx from 'rxjs';
import { mapAccum } from 'ramda';
import * as BigNumber from 'bignumber.js';
import getObservableEtherDelta from './etherdelta/getObservableEtherDelta';
import getObservableRelayer from './0x/getObservableRelayer';
import getExchangeEndpoint from '../getExchangeEndpoint';

type ExchangeEnum = 'RADAR_RELAY' | 'ETHER_DELTA';

type ExchangeCreator = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
) => Rx.Observable<any>;

const exchangeToCreatorFunction: { [P in ExchangeEnum]: ExchangeCreator } = {
  RADAR_RELAY: (baseTokenAddress, quoteTokenAddress) =>
    getObservableRelayer(
      getExchangeEndpoint.live.radarRelay(),
      baseTokenAddress,
      quoteTokenAddress,
    ),
  ETHER_DELTA: (baseTokenAddress, quoteTokenAddress) =>
    getObservableEtherDelta(
      getExchangeEndpoint.live.etherDelta(baseTokenAddress),
    ),
};

const getAggregatedObservable = (
  baseTokenAddress,
  quoteTokenAddress,
  exchanges: ExchangeEnum[],
) => {
  const selectedExchanges = exchanges.map(name =>
    exchangeToCreatorFunction[name](baseTokenAddress, quoteTokenAddress),
  );

  const aggregatedObservables = Rx.Observable.merge(...selectedExchanges);

  const scanned = aggregatedObservables.scan(
    (currentCombinedOrderbook, observedUpdatedOrderbook) => {
      if (observedUpdatedOrderbook.length) {
        const { exchange } = observedUpdatedOrderbook[0];

        const cleanedCurrentOrderbook = currentCombinedOrderbook.filter(
          order => order.exchange !== exchange,
        );

        const aggregatedAndSortedOrderbook = cleanedCurrentOrderbook
          .concat(observedUpdatedOrderbook)
          .sort((a, b) => {
            if (a.type === b.type) return b.price.minus(a.price).toNumber();
            return a.type === 'buy' ? 1 : -1;
          });

        const totalSellCumulativeVolume = aggregatedAndSortedOrderbook.reduce(
          (previousVolume, currentOrder) =>
            currentOrder.type === 'sell'
              ? previousVolume.plus(currentOrder.sell.howMuch)
              : previousVolume,
          new BigNumber(0),
        );

        const orderbook = mapAccum(
          (accumulator, currentOrder) => {
            const enhancedOrder = Object.assign({}, currentOrder);

            if (enhancedOrder.type === 'sell') {
              enhancedOrder.cumulativeVolume = accumulator;
              return [
                accumulator.minus(enhancedOrder.sell.howMuch),
                enhancedOrder,
              ];
            } else if (enhancedOrder.type === 'buy') {
              enhancedOrder.cumulativeVolume = accumulator.plus(
                enhancedOrder.buy.howMuch,
              );
              return [enhancedOrder.cumulativeVolume, enhancedOrder];
            }

            throw new Error(
              `Order type must be specified ${JSON.stringify(enhancedOrder)}`,
            );
          },
          totalSellCumulativeVolume,
          aggregatedAndSortedOrderbook,
        )[1];
        return orderbook;
      }

      return currentCombinedOrderbook;
    },
    [],
  );

  return scanned;
};

export default getAggregatedObservable;
