import contract from "truffle-contract";
import ExchangeJson from "@melonproject/protocol/build/contracts/Exchange.json";

import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";

const getExchangeContract = async () => {
  const Exchange = contract(ExchangeJson);
  Exchange.setProvider(setup.currentProvider);
  const universeConfig = await getConfig();
  return Exchange.at(universeConfig.exchangeAddress);
};

export default getExchangeContract;
