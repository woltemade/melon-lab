// @flow
import Api from '@parity/api';

import SimpleAdapterAbi from '@melonproject/protocol/out/exchange/adapter/SimpleAdapter.abi.json';
import addressBook from '@melonproject/protocol/addressBook.json';
import setup from '../../utils/setup';

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const api = new Api(setup.provider);
  return api.newContract(SimpleAdapterAbi, addressBook.kovan.SimpleAdapter);
};

export default getExchangeAdapterContract;
