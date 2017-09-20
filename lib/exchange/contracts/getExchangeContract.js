import contract from "truffle-contract";
import ExchangeJson from "@melonproject/protocol/build/contracts/simpleAdapter.json";

import setup from "../../utils/setup";

const getExchangeContract = async () => {
  const Exchange = contract(ExchangeJson);
  Exchange.setProvider(setup.currentProvider);
  return Exchange.deployed();
};

export default getExchangeContract;
