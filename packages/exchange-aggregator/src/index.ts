import BigNumber from 'bignumber.js';

export type OrderTypeEnum = 'sell' | 'buy';

// @TODO: Properly define the order type.
export interface Order {
  price: BigNumber;
  type: OrderTypeEnum;
}

export interface OrderBuy extends Order {
  buy: {
    howMuch: BigNumber;
  };
}

export interface OrderSell extends Order {
  sell: {
    howMuch: BigNumber;
  };
}

export interface OrderWithCumulativeVolume extends Order {
  cumulativeVolume: BigNumber;
}

export type ExchangeEnum = 'RADAR_RELAY' | 'ETHER_DELTA' | 'OASIS_DEX';

export {
  default as getAggregatedObservable,
} from './orderbooks/getAggregatedObservable';
