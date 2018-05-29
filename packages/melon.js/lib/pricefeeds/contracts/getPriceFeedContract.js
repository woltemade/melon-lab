import PriceFeedAbi from '@melonproject/smart-contracts/out/pricefeeds/CanonicalPriceFeed.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Gets contract instance of deployed DataFeed
 */
const getPriceFeedContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(PriceFeedAbi, config.priceFeedAddress);
};

export default getPriceFeedContract;
