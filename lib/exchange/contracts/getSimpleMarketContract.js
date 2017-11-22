// @flow
import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
// import getConfig from "../../version/calls/getConfig";
// TODO: bring back config
import setup from "../../utils/setup";

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async () => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync("node_modules/@melonproject/protocol/out/SimpleMarket.abi"),
  );
  return api.newContract(abi, addressBook.kovan.SimpleMarket);
};

export default getSimpleMarketContract;
