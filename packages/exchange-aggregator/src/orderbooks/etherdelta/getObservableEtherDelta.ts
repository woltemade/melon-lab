import * as Rx from 'rxjs';
import * as axios from 'axios';
import * as BigNumber from 'bignumber.js';
import * as tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';

/**
 *  * Gets Etherdelta orderbook and formats the orders
 */

// TODO: delete following 6 functions when ready to be used in dynamic way
const getTokenInfoByAddress = address =>
  tokenInfo.live.find(t => t.address.toLowerCase() === address.toLowerCase()) ||
  (() => {
    throw new Error(`No token found with address ${address}`);
  })();

const getTokenInfo = tokenSymbol =>
  tokenInfo.live.find(t => t.symbol === tokenSymbol.toUpperCase()) ||
  (() => {
    throw new Error(`No token found with symbol ${tokenSymbol}`);
  })();

const getSymbol = address => getTokenInfoByAddress(address).symbol;

const getDecimals = tokenSymbol => getTokenInfo(tokenSymbol).decimals;

const toReadable = (quantity, tokenSymbol) => {
  const decimals = getDecimals(tokenSymbol);
  return new BigNumber(quantity).div(10 ** decimals);
};

const getEtherDeltaOrderbook = async endpoint => {
  const response = await axios(endpoint);

  const bids = response.data.buys.map(order => ({
    id: order.id,
    owner: order.user,
    isActive: true,
    sell: {
      symbol: 'ETH',
      howMuch: toReadable(order.amountGive, 'W-ETH'),
    },
    buy: {
      symbol: getSymbol(order.tokenGet),
      howMuch: toReadable(order.amountGet, getSymbol(order.tokenGet)),
    },
    type: 'buy',
    signature: { v: order.v, r: order.r, s: order.s },
    expiration: order.expires,
    price: new BigNumber(order.price),
    exchangeContractAddress: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819',
    exchange: 'ETHER_DELTA',
  }));
  const asks = response.data.sells.map(order => ({
    id: order.id,
    owner: order.user,
    isActive: true,
    sell: {
      symbol: getSymbol(order.tokenGive),
      howMuch: toReadable(order.amountGive, getSymbol(order.tokenGive)),
    },
    buy: {
      symbol: 'ETH',
      howMuch: toReadable(order.amountGet, 'W-ETH'),
    },
    type: 'sell',
    signature: { v: order.v, r: order.r, s: order.s },
    expiration: order.expires,
    price: new BigNumber(order.price),
    exchangeContractAddress: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819',
    exchange: 'ETHER_DELTA',
  }));
  const orderbook = bids.concat(asks);
  return orderbook;
};

const getObservableEtherDelta = endpoint => {
  const promiseOrderbook = () =>
    Rx.Observable.fromPromise(getEtherDeltaOrderbook(endpoint));

  return Rx.Observable.interval(10000)
    .startWith(-1)
    .flatMap(promiseOrderbook);
};

export default getObservableEtherDelta;
