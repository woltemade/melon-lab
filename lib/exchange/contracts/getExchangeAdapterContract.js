import contract from "truffle-contract";
import ExchangeAdapterJson from "@melonproject/protocol/build/contracts/simpleAdapter.json";

import setup from "../../utils/setup";

const getExchangeAdapterContract = async () => {
  const ExchangeAdapter = contract(ExchangeAdapterJson);
  ExchangeAdapter.setProvider(setup.currentProvider);
  return ExchangeAdapter.deployed();
};

export default getExchangeAdapterContract;
