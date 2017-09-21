import contract from "truffle-contract";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";
import getConfig from "../../version/calls/getConfig";

import setup from "../../utils/setup";

const getDataFeedContract = async () => {
  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  const config = await getConfig();
  return DataFeed.at(config.dataFeedAddress);
};

export default getDataFeedContract;
