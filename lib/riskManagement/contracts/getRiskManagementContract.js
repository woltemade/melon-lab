// @flow
import Api from "@parity/api";

import addressBook from "@melonproject/protocol/address-book.json";
import setup from "../../utils/setup";
import RMMakeOrdersAbi from "../../../abi/RMMakeOrders.json";

/**
 * Get deployed participation contract instance
 */
const getParticipationContract = async () => {
  const api = new Api(setup.provider);
  return api.newContract(RMMakeOrdersAbi, addressBook.kovan.RMMakeOrders);
};

export default getParticipationContract;
