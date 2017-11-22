// @flow
import getFundContract from "../contracts/getFundContract";

import type { Address } from "../../assets/schemas/Address";
import type { Order } from "../../exchange/schemas/Order";

/**
 * Get the order history on exchanges for fund at `fundAddress`
 */
const getOrdersHistory = async (fundAddress: Address): Promise<[Order]> => {
  const fundContract = getFundContract(fundAddress);

  const requests = await fundContract.instance.orders.call();

  return requests;
};

export default getOrdersHistory;
