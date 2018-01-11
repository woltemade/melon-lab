import Api from "@parity/api";

import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import VersionAbi from "../../../abi/Version.json";

/**
 * Get deployed version contract instance
 */
const getVersionContract = () => {
  const api = new Api(setup.provider);
  return api.newContract(VersionAbi, addressBook.kovan.Version);
};

export default getVersionContract;
