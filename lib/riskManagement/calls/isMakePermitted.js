import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
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
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  const orderPrice = await canonicalPriceFeedContract.instance.getOrderPriceInfo.call(
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
