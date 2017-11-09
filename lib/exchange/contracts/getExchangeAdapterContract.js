// @flow
import contract from "truffle-contract";
import ExchangeAdapterJson from "@melonproject/protocol/build/contracts/simpleAdapter.json";

import setup from "../../utils/setup";

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const ExchangeAdapter = contract(ExchangeAdapterJson);
  ExchangeAdapter.setProvider(setup.currentProvider);
  return ExchangeAdapter.deployed();
};

export default getExchangeAdapterContract;
