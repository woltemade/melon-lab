// @flow
import Api from '@parity/api';
import SimpleMarketAbi from '@melonproject/protocol/out/exchange/thirdparty/SimpleMarket.abi.json';
import addressBook from '@melonproject/protocol/addressBook.json';
// TODO: bring back config
import setup from '../../utils/setup';

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async () => {
  const api = new Api(setup.provider);
  return api.newContract(SimpleMarketAbi, addressBook.kovan.SimpleMarket);
};

export default getSimpleMarketContract;
