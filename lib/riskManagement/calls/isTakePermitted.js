import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getRiskManagementContract from '../contracts/getRiskManagementContract';
import toProcessable from '../../assets/utils/toProcessable';

import getOrder from '../../exchange/calls/getOrder';

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async (
  environment,
  {
    referencePrice,
    giveAsset,
    getAsset,
    giveQuantity,
    getQuantity,
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
      giveAsset,
      getAsset,
      toProcessable(config, giveQuantity, giveAsset),
      toProcessable(config, getQuantity, getAsset),
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
      giveAsset,
      getAsset,
      toProcessable(config, giveQuantity, giveAsset),
      toProcessable(config, getQuantity, getQuantity),
    ],
  );
  return result;
};

export default isTakePermitted;
