// @flow
import Api from "@parity/api";

import getConfig from "../../version/calls/getConfig";
// TODO: bring back config
import setup from "../../utils/setup";
import SimpleMarketAbi from "../../../abi/SimpleMarket.json";

/**
 * Get deployed SimpleMarket contract instance
 */
const getSimpleMarketContract = async () => {
  const api = new Api(setup.provider);
  const config = await getConfig();

  return api.newContract(SimpleMarketAbi, config.exchangeAddress);
};

export default getSimpleMarketContract;
