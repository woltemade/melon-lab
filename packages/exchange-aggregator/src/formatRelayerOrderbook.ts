import * as tokenInfo from '@melonproject/smart-contracts/utils/info/tokenInfo';
import BigNumber from 'bignumber.js';
import { getSymbol, toReadable, getPrices } from '@melonproject/melon.js';

const formatRelayerOrderbook = exchange => (bids, asks) => {
  const formattedBids = bids.map(order => ({
    salt: order.salt,
    maker: order.maker,
    taker: order.taker,
    isActive: true,
    sell: {
      symbol: getSymbol(order.makerTokenAddress),
      howMuch: toReadable(
        order.makerTokenAmount,
        getSymbol(order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(order.takerTokenAddress),
      howMuch: toReadable(
        order.takerTokenAmount,
        getSymbol(order.takerTokenAddress),
      ),
    },
    type: 'buy',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));
  const formattedAsks = asks.map(order => ({
    salt: order.salt,
    maker: order.maker,
    taker: order.taker,
    isActive: true,
    sell: {
      symbol: getSymbol(order.makerTokenAddress),
      howMuch: toReadable(
        order.makerTokenAmount,
        getSymbol(order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(order.takerTokenAddress),
      howMuch: toReadable(
        order.takerTokenAmount,
        getSymbol(order.takerTokenAddress),
      ),
    },
    type: 'sell',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));

  const orderbook = [...formattedBids, ...formattedAsks].map(order => ({
    ...order,
    price: order.type === 'buy' ? getPrices(order).buy : getPrices(order).sell,
  }));

  return orderbook;
};

export default formatRelayerOrderbook;
