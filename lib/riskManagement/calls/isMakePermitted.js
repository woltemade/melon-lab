import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

/**
 * Test if make order request is permitted
 */
const isMakePermitted = async (
  environment,
  {
    referencePrice,
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
    fundContract,
  },
) => {
  const config = await getConfig(environment);
  const priceFeedContract = await getPriceFeedContract(environment);

  const orderPrice = await priceFeedContract.instance.getOrderPriceInfo.call(
    {},
    [
      getAddress(config, sellWhichToken),
      getAddress(config, buyWhichToken),
      toProcessable(config, sellHowMuch, sellWhichToken),
      toProcessable(config, buyHowMuch, buyWhichToken),
    ],
  );

  const riskManagementContract = await getRiskManagementContract(
    environment,
    fundContract,
  );

  const result = await riskManagementContract.instance.isMakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      getAddress(config, sellWhichToken),
      getAddress(config, buyWhichToken),
      toProcessable(config, sellHowMuch, sellWhichToken),
      toProcessable(config, buyHowMuch, buyWhichToken),
    ],
  );

  return result;
};

export default isMakePermitted;
