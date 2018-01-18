import Api from '@parity/api';

import addressBook from '@melonproject/protocol/addressBook.json';
import VersionAbi from '@melonproject/protocol/out/version/Version.abi.json';
import setup from '../../utils/setup';

/**
 * Get deployed version contract instance
 */
const getVersionContract = () => {
  const api = new Api(setup.provider);
  return api.newContract(VersionAbi, addressBook.kovan.Version);
};

export default getVersionContract;
