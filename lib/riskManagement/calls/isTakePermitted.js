import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async (
  environment,
  {
    fundContract,
    referencePrice,
    takerAsset,
    makerAsset,
    sellQuantity,
    buyQuantity,
  },
) => {
  const config = await getConfig(environment);

  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const orderPrice = await canonicalPriceFeedContract.instance.getOrderPriceInfo.call(
    {},
    [
      getAddress(config, takerAsset),
      getAddress(config, makerAsset),
      toProcessable(config, sellQuantity, getAddress(config, takerAsset)),
      toProcessable(config, buyQuantity, getAddress(config, makerAsset)),
    ],
  );

  const riskManagementContract = await getRiskManagementContract(
    environment,
    fundContract,
  );

  const result = await riskManagementContract.instance.isTakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      getAddress(config, takerAsset),
      getAddress(config, makerAsset),
      toProcessable(config, sellQuantity, getAddress(config, takerAsset)),
      toProcessable(config, buyQuantity, getAddress(config, makerAsset)),
    ],
  );
  return result;
};

export default isTakePermitted;
