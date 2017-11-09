// @flow
import contract from "truffle-contract";
import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

import type { Address } from "../../assets/schemas/Address";
import type { Order } from "../../exchange/schemas/Order";

/**
 * Get the order history on exchanges for fund at `fundAddress`
 */
const getOrdersHistory = async (fundAddress: Address): Promise<[Order]> => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(fundAddress);

  const requests = await fundContract.orders();

  return requests;
};

export default getOrdersHistory;
