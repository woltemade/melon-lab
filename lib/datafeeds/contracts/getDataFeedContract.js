import Api from "@parity/api";

import PriceFeedAbi from "@melonproject/protocol/out/pricefeeds/PriceFeed.abi.json";
import getConfig from "../../version/calls/getConfig";

import setup from "../../utils/setup";

/**
 * Gets contract instance of deployed DataFeed
 */
const getPriceFeedContract = async () => {
  const api = new Api(setup.provider);
  const config = await getConfig();
  return api.newContract(PriceFeedAbi, config.dataFeedAddress);
};

export default getPriceFeedContract;
