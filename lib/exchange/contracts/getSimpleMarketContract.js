// @flow
import Api from '@parity/api';
import addressBook from '@melonproject/protocol/addressBook.json';
// TODO: bring back config
import setup from '../../utils/setup';
import SimpleMarketAbi from '../../../abi/SimpleMarket.json';

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async () => {
  const api = new Api(setup.provider);
  return api.newContract(SimpleMarketAbi, addressBook.kovan.SimpleMarket);
};

export default getSimpleMarketContract;
