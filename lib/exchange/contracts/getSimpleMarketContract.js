// @flow
import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import getConfig from "../../version/calls/getConfig";
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
  const config = await getConfig();

  return api.newContract(abi, config.exchangeAddress);
  // return api.newContract(abi, "0x7f98f4790722A24de32478714F0350A56689825E");
};

export default getSimpleMarketContract;
