import Api from "@parity/api";
import fs from "fs";
import getConfig from "../../version/calls/getConfig";

import setup from "../../utils/setup";

/**
 * Gets contract instance of deployed DataFeed
 */
const getDataFeedContract = async () => {
  const api = new Api(setup.provider);
  const abi = JSON.parse(
    fs.readFileSync(
      "node_modules/@melonproject/protocol/out/datafeeds/DataFeed.abi",
    ),
  );
  const config = await getConfig();
  return api.newContract(abi, config.dataFeedAddress);
};

export default getDataFeedContract;
