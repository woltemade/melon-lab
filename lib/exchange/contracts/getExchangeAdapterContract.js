// @flow
import Api from '@parity/api';

import simpleAdapterAbi from '@melonproject/protocol/out/exchange/adapter/simpleAdapter.abi.json';
import addressBook from '@melonproject/protocol/addressBook.json';
import setup from '../../utils/setup';

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const api = new Api(setup.provider);
  return api.newContract(simpleAdapterAbi, addressBook.kovan.simpleAdapter);
};

export default getExchangeAdapterContract;
