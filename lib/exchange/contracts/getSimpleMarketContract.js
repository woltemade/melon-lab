// @flow
import SimpleMarketAbi from '@melonproject/protocol/out/exchange/thirdparty/SimpleMarket.abi.json';
import addressBook from '@melonproject/protocol/addressBook.json';

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async environment =>
  environment.api.newContract(SimpleMarketAbi, addressBook.kovan.SimpleMarket);
export default getSimpleMarketContract;
