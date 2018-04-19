import StakingPriceFeedAbi from '@melonproject/protocol/out/pricefeeds/StakingPriceFeed.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
const getStakingPriceFeedContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(
    StakingPriceFeedAbi,
    config.canonicalPricefeedAddress,
  );
};

export default getStakingPriceFeedContract;
