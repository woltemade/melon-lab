import BigNumber from 'bignumber.js';
import * as tokenInfo from '@melonproject/protocol/utils/info/tokenInfo';

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

const formatNewOrder = (order, baseTokenAddress) =>
  order.makerTokenAddress === baseTokenAddress
    ? {
        id: order.salt,
        owner: order.maker,
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
        exchange: 'RADAR_RELAY',
      }
    : {
        id: order.salt,
        owner: order.maker,
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
        exchange: 'RADAR_RELAY',
      };

export default formatNewOrder;
