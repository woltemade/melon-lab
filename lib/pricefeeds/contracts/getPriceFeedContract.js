import addressBook from '@melonproject/protocol/addressBook.json';
import PriceFeedAbi from '@melonproject/protocol/out/pricefeeds/PriceFeed.abi.json';

/**
 * Gets contract instance of deployed DataFeed
 */
const getPriceFeedContract = async environment =>
  environment.api.newContract(PriceFeedAbi, addressBook.kovan.PriceFeed);
export default getPriceFeedContract;
