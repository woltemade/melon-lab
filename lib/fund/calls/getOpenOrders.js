// @flow
import getOrdersHistory from './getOrdersHistory';
import getConfig from '../../version/calls/getConfig';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Returns all the order the fund has made and whose status is active
 */

const getOpenOrders = async (environment: Environment, { fundAddress }) => {
  const config = await getConfig(environment);
  const orders = await getOrdersHistory(environment, { fundAddress });
  const quoteAssetSymbol = getQuoteAssetSymbol(environment);

  return orders.filter(o => o[1].toNumber() === 0).map(order => ({
    id: order[9],
    exchangeOrderId: order[0],
    sellSymbol: getSymbol(config, order[3]),
    buySymbol: getSymbol(config, order[4]),
    sellHowMuch: toReadable(config, order[5], getSymbol(config, order[3])),
    buyHowMuch: toReadable(config, order[6], getSymbol(config, order[4])),
    timestamp: new Date(order[7].times(1000).toNumber()),
    type: getSymbol(config, order[3]) === quoteAssetSymbol ? 'buy' : 'sell',
    price:
      getSymbol(config, order[3]) === quoteAssetSymbol
        ? toReadable(config, order[5], getSymbol(config, order[3])).div(
            toReadable(config, order[6], getSymbol(config, order[4])),
          )
        : toReadable(config, order[6], getSymbol(config, order[4])).div(
            toReadable(config, order[5], getSymbol(config, order[3])),
          ),
  }));
};

export default getOpenOrders;
