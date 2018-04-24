import * as Rx from 'rxjs';
import * as R from 'ramda';
import BigNumber from 'bignumber.js';
import getObservableEtherDelta from './etherdelta/getObservableEtherDelta';
import getObservableRelayer from './0x/getObservableRelayer';
import getObservableOasisDex from './oasisDex/getObservableOasisDex';
import getExchangeEndpoint from '../getExchangeEndpoint';

export type OrderTypeEnum = 'sell' | 'buy';

// @TODO: Properly define the order type.
export interface IOrder {
  price: BigNumber;
  type: OrderTypeEnum;
}

export interface IOrderBuy extends IOrder {
  buy: {
    howMuch: BigNumber;
  };
}

export interface IOrderSell extends IOrder {
  sell: {
    howMuch: BigNumber;
  };
}

export interface IOrderWithCumulativeVolume extends IOrder {
  cumulativeVolume: BigNumber;
}

export type ExchangeEnum = 'RADAR_RELAY' | 'ETHER_DELTA' | 'OASIS_DEX';

export type ExchangeCreator = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
) => Rx.Observable<IOrder[][]>;

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

const concatOrderbooks = R.reduce<IOrder[], IOrder[]>(R.concat, []);

const sortOrderBooks = R.sort<IOrder>((a, b) => {
  if (a.type === b.type) {
    return b.price.minus(a.price).toNumber();
  }

  return a.type === 'buy' ? 1 : -1;
});

const filterSellOrders = <(orders: IOrder[]) => IOrderSell[]>R.filter(
  R.propEq('type', 'sell'),
);

const totalSellVolume = R.reduce<IOrderSell, BigNumber>(
  (carry, order) => carry.plus(order.sell.howMuch),
  new BigNumber(0),
);

const accumulateSells = (accumulator: BigNumber, order: IOrderSell) => [
  accumulator.minus(order.sell.howMuch),
  Object.assign({}, { cumulativeVolume: accumulator }, order),
];

const accumulateBuys = (accumulator: BigNumber, order: IOrderBuy) => [
  accumulator.plus(order.buy.howMuch),
  Object.assign({}, { cumulativeVolume: accumulator }, order),
];

// Retrieves the appropriate projection function for sell/buy orders.
const accumulateOrdersFn = R.cond([
  [R.converge(R.propEq('type', 'sell'), [R.nthArg(1)]), accumulateSells],
  [R.converge(R.propEq('type', 'buy'), [R.nthArg(1)]), accumulateBuys],
]);

const getAggregatedObservable = (
  baseTokenAddress: string,
  quoteTokenAddress: string,
  exchanges: ExchangeEnum[],
) => {
  const exchanges$ = Rx.Observable.from<ExchangeEnum>(exchanges);
  const orderbooks$ = exchanges$
    .map(name => exchangeToCreatorFunction[name])
    .map(create => create(baseTokenAddress, quoteTokenAddress))
    .combineAll<Rx.Observable<IOrder[][]>, IOrder[][]>()
    .distinctUntilChanged();

  // Concat and sort orders across all order books.
  const allOrders$ = orderbooks$
    .map(R.compose(sortOrderBooks, concatOrderbooks))
    .share();

  // Compute the cumulative sell volume of all sell orders.
  const sellVolume$ = allOrders$.map(
    R.compose(totalSellVolume, filterSellOrders),
  );

  return Rx.Observable.combineLatest<IOrderWithCumulativeVolume>(
    [sellVolume$, allOrders$],
    R.compose(R.last, R.mapAccum(accumulateOrdersFn)),
  );
};

export default getAggregatedObservable;
