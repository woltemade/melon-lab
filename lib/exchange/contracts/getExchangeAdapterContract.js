// @flow
import Api from "@parity/api";

import addressBook from "@melonproject/protocol/addressBook.json";
import setup from "../../utils/setup";
import simpleAdapterAbi from "../../../abi/simpleAdapter.json";

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const api = new Api(setup.provider);
  return api.newContract(simpleAdapterAbi, addressBook.kovan.simpleAdapter);
};

export default getExchangeAdapterContract;
