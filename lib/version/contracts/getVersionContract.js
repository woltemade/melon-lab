import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";

/**
 * Get deployed version contract instance
 */
const getVersionContract = () => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/version/Version.abi",
    ),
  );
  return api.newContract(abi, addressBook.kovan.Version);
};

export default getVersionContract;
