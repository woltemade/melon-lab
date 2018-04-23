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
    makerAsset,
    takerAsset,
    makerQuantity,
    takerQuantity,
    fundContract,
  },
) => {
  const config = await getConfig(environment);
  const priceFeedContract = await getPriceFeedContract(environment);

  const orderPrice = await priceFeedContract.instance.getOrderPriceInfo.call(
    {},
    [
      getAddress(config, makerAsset),
      getAddress(config, takerAsset),
      toProcessable(config, makerQuantity, makerAsset),
      toProcessable(config, takerQuantity, takerAsset),
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
      getAddress(config, makerAsset),
      getAddress(config, takerAsset),
      toProcessable(config, makerQuantity, makerAsset),
      toProcessable(config, takerQuantity, takerAsset),
    ],
  );

  return result;
};

export default isMakePermitted;
