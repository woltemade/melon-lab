import Api from "@parity/api";

import getConfig from "../../version/calls/getConfig";
import DatafeedAbi from "../../../abi/DataFeed.json";

import setup from "../../utils/setup";

/**
 * Gets contract instance of deployed DataFeed
 */
const getDataFeedContract = async () => {
  const api = new Api(setup.provider);
  const config = await getConfig();
  return api.newContract(DatafeedAbi, config.dataFeedAddress);
};

export default getDataFeedContract;
