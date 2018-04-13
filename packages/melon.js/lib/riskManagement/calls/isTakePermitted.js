import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

import getOrder from '../../exchange/calls/getOrder';

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async (
  environment,
  { referencePrice, orderId, fundContract },
) => {
  const config = await getConfig(environment);
  const order = await getOrder(environment, { id: orderId });

  const sellWhichToken = getAddress(config, order.sell.symbol);
  const buyWhichToken = getAddress(config, order.buy.symbol);
  const buyHowMuch = order.buy.howMuch;
  const sellHowMuch = order.sell.howMuch;

  const datafeedContract = await getPriceFeedContract(environment);
  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    buyWhichToken,
    sellWhichToken,
    toProcessable(config, buyHowMuch, order.buy.symbol),
    toProcessable(config, sellHowMuch, order.sell.symbol),
  ]);

  const riskManagementContract = await getRiskManagementContract(
    environment,
    fundContract,
  );

  const result = await riskManagementContract.instance.isTakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      sellWhichToken,
      buyWhichToken,
      toProcessable(config, sellHowMuch, order.sell.symbol),
      toProcessable(config, buyHowMuch, order.buy.symbol),
    ],
  );
  return result;
};

export default isTakePermitted;
