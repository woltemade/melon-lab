import contract from "truffle-contract";
import SimpleMarketJson from "@melonproject/protocol/build/contracts/SimpleMarket.json";

import setup from "../../utils/setup";

const getSimpleMarketContract = async () => {
  const Exchange = contract(SimpleMarketJson);
  Exchange.setProvider(setup.currentProvider);
  return Exchange.deployed();
};

export default getSimpleMarketContract;
