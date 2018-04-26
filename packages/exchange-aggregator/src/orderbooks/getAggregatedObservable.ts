import BigNumber from 'bignumber.js';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import getExchangeEndpoint from '../getExchangeEndpoint';
import getObservableRelayer from './0x/getObservableRelayer';
import getObservableEtherDelta from './etherdelta/getObservableEtherDelta';
import getObservableOasisDex from './oasisDex/getObservableOasisDex';

import {
  ExchangeEnum,
  Order,
  OrderBuy,
  OrderSell,
  OrderWithCumulativeVolume,
} from '../index';

export type ExchangeCreator = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
) => Rx.Observable<Order[][]>;

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
  OASIS_DEX: (baseTokenAddress, quoteTokenAddress) =>
    getObservableOasisDex(baseTokenAddress, quoteTokenAddress),
};

const concatOrderbooks = R.reduce<Order[], Order[]>(R.concat, []);

const sortOrderBooks = R.sort<Order>((a, b) => {
  if (a.type === b.type) {
    return b.price.minus(a.price).toNumber();
  }

  return a.type === 'buy' ? 1 : -1;
});

const filterSellOrders = R.filter(R.propEq('type', 'sell')) as (
  orders: Order[],
) => OrderSell[];

const totalSellVolume = R.reduce<OrderSell, BigNumber>(
  (carry, order) => carry.plus(order.sell.howMuch),
  new BigNumber(0),
);

const accumulateSells = (accumulator: BigNumber, order: OrderSell) => [
  accumulator.minus(order.sell.howMuch),
  { ...order, cumulativeVolume: accumulator },
];

const accumulateBuys = (accumulator: BigNumber, order: OrderBuy) => [
  accumulator.plus(order.buy.howMuch),
  { ...order, cumulativeVolume: accumulator },
];

// Retrieves the appropriate projection function for sell/buy orders.
const accumulateOrdersFn = R.cond([
  [R.converge(R.propEq('type', 'sell'), [R.nthArg(1)]), accumulateSells],
  [R.converge(R.propEq('type', 'buy'), [R.nthArg(1)]), accumulateBuys],
]);

const getAggregatedObservable = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
  exchanges: ExchangeEnum[] = ['ETHER_DELTA', 'OASIS_DEX'],
) => {
  const exchanges$ = Rx.Observable.from<ExchangeEnum>(exchanges);
  const orderbooks$ = exchanges$
    .map(name => exchangeToCreatorFunction[name])
    .map(create => create(baseTokenAddress, quoteTokenAddress))
    .combineAll<Rx.Observable<Order[][]>, Order[][]>()
    .distinctUntilChanged();

  // Concat and sort orders across all order books.
  const allOrders$ = orderbooks$
    .map(R.compose(sortOrderBooks, concatOrderbooks))
    .share();

  // Compute the cumulative sell volume of all sell orders.
  const sellVolume$ = allOrders$.map(
    R.compose(totalSellVolume, filterSellOrders),
  );

  return Rx.Observable.combineLatest<OrderWithCumulativeVolume>(
    [sellVolume$, allOrders$],
    R.compose(R.last, R.mapAccum(accumulateOrdersFn)),
  );
};

export default getAggregatedObservable;
