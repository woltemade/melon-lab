// @flow
import BigNumber from "bignumber.js";

import setup from "../../utils/setup";
import getOrder from "../../exchange/calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getFundContract from "../contracts/getFundContract";
import sendTransaction from "../../utils/parity/sendTransaction";

import type { Address } from "../../assets/schemas/Address";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";
import type { Order } from "../../exchange/schemas/Order";

const makeOrderFromFund = async (
  vaultAddress: Address,
  sellWhichToken: TokenSymbol,
  buyWhichToken: TokenSymbol,
  sellHowMuch: BigNumber,
  buyHowMuch: BigNumber,
  from: Address = setup.defaultAccount,
): Promise<Order> => {
  const fundContract = await getFundContract(vaultAddress);

  const args = [
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
  ];

  const receipt = await sendTransaction(
    fundContract,
    "makeOrder",
    args,
    {},
    from,
  );
  const updateLog = findEventInLog("OrderUpdated", receipt);
  const orderId = updateLog.params.id.value;

  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrderFromFund;
