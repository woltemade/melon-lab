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

  // return api.newContract(
  //   SimpleMarketAbi,
  //   '0x7B1a19E7C84036503a177a456CF1C13e0239Fc02',
  // );
};

export default getSimpleMarketContract;
