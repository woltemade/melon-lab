import StakingPriceFeedAbi from '@melonproject/protocol/out/pricefeeds/StakingPriceFeed.abi.json';

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
const getStakingPriceFeedContract = async (environment, address) =>
  environment.api.newContract(StakingPriceFeedAbi, address);

export default getStakingPriceFeedContract;
