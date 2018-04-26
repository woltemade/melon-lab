import {
  getAggregatedObservable,
  Order,
  OrderBuy,
  OrderSell,
} from '@melonproject/exchange-aggregator';
import { getParityProvider, getPrice } from '@melonproject/melon.js';
import BigNumber from 'bignumber.js';
import * as R from 'ramda';
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

const filterBuyOrders = R.filter(R.propEq('type', 'buy')) as (
  orders: Order[],
) => OrderBuy[];

const filterSellOrders = R.filter(R.propEq('type', 'sell')) as (
  orders: Order[],
) => OrderSell[];

const accumulateSells = (accumulator: BigNumber, order: OrderSell) => {
  const volume = accumulator.plus(order.sell.howMuch);
  return [volume, { order, volume }];
};

const accumulateBuys = (accumulator: BigNumber, order: OrderBuy) => {
  const volume = accumulator.plus(order.buy.howMuch);
  return [volume, { order, volume }];
};

export const orderbook = {
  resolve: (orders: Order[]) => {
    const [totalBuyVolume, buyEntries] = R.compose(
      R.mapAccum(accumulateBuys, new BigNumber(0)),
      filterBuyOrders,
    )(orders);

    const [totalSellVolume, sellEntries] = R.compose(
      R.mapAccum(accumulateSells, new BigNumber(0)),
      filterSellOrders,
    )(orders);

    return {
      allOrders: orders,
      buyEntries,
      sellEntries,
      totalSellVolume,
      totalBuyVolume,
    };
  },
  subscribe: (parent, args, context: Context) => {
    const { pubsub } = context;
    const { baseTokenSymbol, quoteTokenSymbol, exchanges } = args;

    const orderbook$ = getAggregatedObservable(
      baseTokenSymbol,
      quoteTokenSymbol,
      exchanges,
    );

    const channel = `orderbook:${baseTokenSymbol}/${quoteTokenSymbol}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(orderbook$, iterator, publish);
  },
};

export { Order };

export default {
  price,
  orderbook,
};
