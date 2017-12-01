// @flow
import Api from "@parity/api";
import fs from "fs";
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
};

export default getSimpleMarketContract;
