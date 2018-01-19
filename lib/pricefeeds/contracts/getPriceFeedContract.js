import Api from '@parity/api';
import addressBook from '@melonproject/protocol/addressBook.json';
import PriceFeedAbi from '@melonproject/protocol/out/pricefeeds/PriceFeed.abi.json';

import setup from '../../utils/setup';

/**
 * Gets contract instance of deployed DataFeed
 */
const getPriceFeedContract = async () => {
  const api = new Api(setup.provider);
  // return api.newContract(PriceFeedAbi, addressBook.kovan.PriceFeed);
  return api.newContract(
    PriceFeedAbi,
    '0x95969386eccC3185Fe5FC24fC680b044D122eE75',
  );
};

export default getPriceFeedContract;
