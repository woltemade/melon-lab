// @flow
import Api from "@parity/api";
import fs from "fs";
import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import simpleAdapterAbi from "../../contracts/simpleAdapter.json";

/**
 * Get deployed ExchangeAdapter contract instance
 */
const getExchangeAdapterContract = async (): any => {
  const api = new Api(setup.provider);
  return api.newContract(simpleAdapterAbi, addressBook.kovan.simpleAdapter);
};

export default getExchangeAdapterContract;
