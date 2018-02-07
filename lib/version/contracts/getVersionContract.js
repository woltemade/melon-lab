import addressBook from '@melonproject/protocol/addressBook.json';
import VersionAbi from '@melonproject/protocol/out/version/Version.abi.json';

/**
 * Get deployed version contract instance
 */
const getVersionContract = environment =>
  environment.api.newContract(VersionAbi, addressBook.kovan.Version);

export default getVersionContract;
