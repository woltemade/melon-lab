// @flow
import Api from "@parity/api";

import addressBook from "@melonproject/protocol/addressBook.json";
import RMMakeOrdersAbi from "@melonproject/protocol/out/riskmgmt/RMMakeOrders.abi.json";
import setup from "../../utils/setup";

/**
 * Get deployed risk management contract instance
 */
const getRiskManagementContract = async () => {
  const api = new Api(setup.provider);
  return api.newContract(RMMakeOrdersAbi, addressBook.kovan.RMMakeOrders);
};

export default getRiskManagementContract;
