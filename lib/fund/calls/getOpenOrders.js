// @flow
import getOrdersHistory from './getOrdersHistory';
import getConfig from '../../version/calls/getConfig';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import getSymbol from '../../assets/utils/getSymbol';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';
import getExchangeName from '../../exchange/utils/getExchangeName';
import getNetwork from '../../utils/environment/getNetwork';

import type { Environment } from '../../utils/environment/Environment';

/**
 * Returns all the order the fund has made and whose status is active
 */

const getOpenOrders = async (environment: Environment, { fundAddress }) => {
  const config = await getConfig(environment);
  const exchangeContract = await getMatchingMarketContract(environment);
  const orders = await getOrdersHistory(environment, { fundAddress });
  const network = await getNetwork(environment);

  return orders
    .map(async order => ({
      exchangeOrderId: order[1],
      exchangeName: await getExchangeName(environment, order[0]),
      isActive:
        getExchangeName(network, order[0]) === 'MatchingMarket'
          ? await exchangeContract.instance.isActive.call({}, [order[9]])
          : 'N/A',
      orderType: order[2] === 0 ? 'make' : 'take',
      sellSymbol:
        order[2] === 0
          ? getSymbol(config, order[3])
          : getSymbol(config, order[4]),
      buySymbol:
        order[2] === 0
          ? getSymbol(config, order[4])
          : getSymbol(config, order[3]),
      sellHowMuch:
        order[2] === 0
          ? toReadable(config, order[5], getSymbol(config, order[3]))
          : toReadable(config, order[6], getSymbol(config, order[4])),
      buyHowMuch:
        order[2] === 0
          ? toReadable(config, order[6], getSymbol(config, order[4]))
          : toReadable(config, order[5], getSymbol(config, order[3])),
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
    .filter(o => o.isActive); // This will only work for oasisdex orders. HACK: order status is not updated on protocol level on fund contract if order is fully executed; same line 23
};

export default getOpenOrders;
