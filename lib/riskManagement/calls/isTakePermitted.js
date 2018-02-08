import getRiskManagementContract from '../contracts/getRiskManagementContract';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getAddress from '../../assets/utils/getAddress';
import toProcessable from '../../assets/utils/toProcessable';

import getOrder from '../../exchange/calls/getOrder';

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async (
  environment,
  referencePrice,
  orderId,
  fundContract,
) => {
  const order = await getOrder(orderId);

  const sellWhichToken = getAddress(order.sell.symbol);
  const buyWhichToken = getAddress(order.buy.symbol);
  const buyHowMuch = order.buy.howMuch;
  const sellHowMuch = order.sell.howMuch;
  const baseToken =
    order.sell.symbol === 'MLN-T' ? buyWhichToken : sellWhichToken;

  const datafeedContract = await getPriceFeedContract(environment);
  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    buyWhichToken,
    sellWhichToken,
    toProcessable(buyHowMuch, order.buy.symbol),
    toProcessable(sellHowMuch, order.sell.symbol),
  ]);

  const riskManagementContract = await getRiskManagementContract(fundContract);

  const result = await riskManagementContract.instance.isTakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      sellWhichToken,
      buyWhichToken,
      toProcessable(sellHowMuch, order.sell.symbol),
      toProcessable(buyHowMuch, order.buy.symbol),
    ],
  );
  return result;
};

export default isTakePermitted;
