// @flow
import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/simpleAdapter.abi",
    ),
  );
  return api.newContract(abi, addressBook.kovan.simpleAdapter);
};

export default getExchangeAdapterContract;
