import contract from "truffle-contract";
import DataFeedJson from "@melonproject/protocol/build/contracts/DataFeed.json";

import setup from "../../utils/setup";

const getDataFeedContract = async () => {
  const DataFeed = contract(DataFeedJson);
  DataFeed.setProvider(setup.currentProvider);
  return DataFeed.deployed();
};

export default getDataFeedContract;
