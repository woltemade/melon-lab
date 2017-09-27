import contract from "truffle-contract";
import SimpleMarketJson from "@melonproject/protocol/build/contracts/SimpleMarket.json";
import getConfig from "../../version/calls/getConfig";

import setup from "../../utils/setup";

const getSimpleMarketContract = async () => {
  const Exchange = contract(SimpleMarketJson);
  Exchange.setProvider(setup.currentProvider);
  const config = await getConfig();
  return Exchange.at(config.exchangeAddress);
};

export default getSimpleMarketContract;
