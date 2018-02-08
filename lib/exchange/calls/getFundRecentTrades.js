// @flow
import BigNumber from 'bignumber.js';
import toReadable from '../../assets/utils/toReadable';
import getDecimals from '../../assets/utils/getDecimals';
import getSymbol from '../../assets/utils/getSymbol';
import getRecentTrades from './getRecentTrades';
import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * @deprecated should be same as Trade
 */
type FundTrade = {
  maker: Address,
  taker: Address,
  timeStamp: Date,
  sellQuantity: BigNumber,
  buyQuantity: BigNumber,
  sellToken: TokenSymbol,
  buyToken: TokenSymbol,
};

/**
 * Get recent trades for `fundAddress` `inlastXdays`.
 */
const getFundRecentTrades = async (
  environment,
  { fundAddress, inlastXdays = 1 },
): Promise<[FundTrade]> => {
  const recentTrades = await getRecentTrades(environment, {
    baseTokenSymbol: undefined,
    quoteTokenSymbol: undefined,
  });
  let trade;
  const arrayOfHashes = [];
  return recentTrades
    .map(event => {
      if (
        (event.params.maker.value === fundAddress ||
          event.params.taker.value === fundAddress) &&
        arrayOfHashes.indexOf(event.transactionHash) === -1
      ) {
        arrayOfHashes.push(event.transactionHash);
        const buySymbol = getSymbol(event.params.pay_gem.value.toLowerCase());
        const sellSymbol = getSymbol(event.params.buy_gem.value.toLowerCase());

        trade = {
          maker: event.params.maker.value,
          taker: event.params.taker.value,
          timestamp: new Date(
            event.params.timestamp.value.times(1000).toNumber(),
          ),
          sellQuantity: event.params.give_amt.value,
          buyQuantity: event.params.take_amt.value,
          sellToken: sellSymbol,
          buyToken: buySymbol,
          transactionHash: event.transactionHash,
        };

        // case BUY ORDER
        if (sellSymbol === 'MLN-T') {
          const decimalDifference =
            getDecimals(sellSymbol) - getDecimals(buySymbol);

          if (getDecimals(buySymbol) !== 18) {
            trade.price = new BigNumber(event.params.give_amt.value)
              .div(event.params.take_amt.value)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.params.give_amt.value).div(
              event.params.take_amt.value,
            );
          }
          trade.type = 'buy';
          trade.quantity = toReadable(event.params.take_amt.value, buySymbol);
        } else if (buySymbol === 'MLN-T') {
          const decimalDifference =
            getDecimals(buySymbol) - getDecimals(sellSymbol);

          if (getDecimals(sellSymbol) !== 18) {
            trade.price = new BigNumber(event.params.take_amt.value)
              .div(event.params.give_amt.value)
              .div(10 ** decimalDifference);
          } else {
            trade.price = new BigNumber(event.params.take_amt.value).div(
              event.params.give_amt.value,
            );
          }
          trade.type = 'sell';
          trade.quantity = toReadable(event.params.give_amt.value, sellSymbol);
        } else {
          return null;
        }
        return trade;
      }
      return null;
    })
    .filter(o => !!o);
};

export default getFundRecentTrades;
