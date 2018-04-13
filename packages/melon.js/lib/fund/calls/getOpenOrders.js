// @flow
import getOrdersHistory from './getOrdersHistory';
import getConfig from '../../version/calls/getConfig';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Returns all the order the fund has made and whose status is active
 */

const getOpenOrders = async (environment: Environment, { fundAddress }) => {
  const config = await getConfig(environment);
  const exchangeContract = await getMatchingMarketContract(environment);
  const orders = await getOrdersHistory(environment, { fundAddress });

  return orders
    .filter(o => o[1].toNumber() === 0)
    .map(async order => ({
      id: order[9],
      isActive: await exchangeContract.instance.isActive.call({}, [order[9]]),
      exchangeOrderId: order[0],
      sellSymbol: getSymbol(config, order[3]),
      buySymbol: getSymbol(config, order[4]),
      sellHowMuch: toReadable(config, order[5], getSymbol(config, order[3])),
      buyHowMuch: toReadable(config, order[6], getSymbol(config, order[4])),
      timestamp: toDate(order[7]),
      type:
        getSymbol(config, order[3]) === config.quoteAssetSymbol
          ? 'buy'
          : 'sell',
      price:
        getSymbol(config, order[3]) === config.quoteAssetSymbol
          ? toReadable(config, order[5], getSymbol(config, order[3])).div(
              toReadable(config, order[6], getSymbol(config, order[4])),
            )
          : toReadable(config, order[6], getSymbol(config, order[4])).div(
              toReadable(config, order[5], getSymbol(config, order[3])),
            ),
    }))
    .filter(o => o.isActive); // HACK: order status is not updated on protocol level on fund contract if order is fully executed; same line 23
};

export default getOpenOrders;
