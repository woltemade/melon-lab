// @flow
import getOrdersHistory from './getOrdersHistory';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';

/**
 * Returns all the order the fund has made and whose status is active
 */

const getOpenOrders = async (environment, { fundAddress }) => {
  const orders = await getOrdersHistory(environment, { fundAddress });
  const quoteAssetSymbol = getQuoteAssetSymbol(environment);

  return orders.filter(o => o[1].toNumber() === 0).map(order => ({
    id: order[9],
    exchangeOrderId: order[0],
    sellSymbol: getSymbol(order[3]),
    buySymbol: getSymbol(order[4]),
    sellHowMuch: toReadable(order[5], getSymbol(order[3])),
    buyHowMuch: toReadable(order[6], getSymbol(order[4])),
    timestamp: new Date(order[7].times(1000).toNumber()),
    type: getSymbol(order[3]) === quoteAssetSymbol ? 'buy' : 'sell',
    price:
      getSymbol(order[3]) === quoteAssetSymbol
        ? toReadable(order[5], getSymbol(order[3])).div(
            toReadable(order[6], getSymbol(order[4])),
          )
        : toReadable(order[6], getSymbol(order[4])).div(
            toReadable(order[5], getSymbol(order[3])),
          ),
  }));
};

export default getOpenOrders;
