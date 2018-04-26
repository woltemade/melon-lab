import {
  getAggregatedObservable,
  OrderWithCumulativeVolume,
} from '@melonproject/exchange-aggregator';
import { getParityProvider, getPrice } from '@melonproject/melon.js';
import * as Rx from 'rxjs';
import { Context } from '../index';
import withUnsubscribe from '../utils/withUnsubscribe';

export const price = {
  resolve: (value: number): number => value,
  subscribe: (parent, args, context: Context) => {
    const { pubsub } = context;
    const { symbol } = args;

    const fetchPrice = environment =>
      Rx.Observable.fromPromise(getPrice(environment, symbol));

    const environment$ = Rx.Observable.fromPromise(getParityProvider());
    const price$ = environment$
      .switchMap(fetchPrice)
      .repeatWhen(Rx.operators.delay(10000));

    const channel = `price:${symbol}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(price$, iterator, publish);
  },
};

export const aggregatedOrderbook = {
  resolve: value => value,
  subscribe: (parent, args, context: Context) => {
    const { pubsub } = context;
    const { baseTokenAddress, quoteTokenAddress, exchanges } = args;

    const orderbook$ = getAggregatedObservable(
      baseTokenAddress,
      quoteTokenAddress,
      exchanges,
    );

    const channel = `orderbook:${baseTokenAddress}/${quoteTokenAddress}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(orderbook$, iterator, publish);
  },
};

// @TODO: https://github.com/Microsoft/TypeScript/issues/9944
export { OrderWithCumulativeVolume };

export default {
  price,
  aggregatedOrderbook,
};
