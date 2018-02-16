import SimpleAdapterAbi from '@melonproject/protocol/out/exchange/adapter/SimpleAdapter.abi.json';
import addressBook from '@melonproject/protocol/addressBook.json';

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async environment =>
  environment.api.newContract(
    SimpleAdapterAbi,
    addressBook.kovan.SimpleAdapter,
  );
export default getExchangeAdapterContract;
