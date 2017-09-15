// @flow
import BigNumber from "bignumber.js";
import { path } from "ramda";
import contract from "truffle-contract";

import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";
import getOrder from "../../exchange/calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";

const makeOrder = async (
  vaultAddress: string,
  sellWhichToken: string,
  buyWhichToken: string,
  sellHowMuch: BigNumber,
  buyHowMuch: BigNumber,
  from: string = setup.defaultAccount,
) => {
  const Fund = contract(FundJson);
  Fund.setProvider(setup.currentProvider);
  const fundContract = Fund.at(vaultAddress);

  const receipt = await fundContract.makeOrder(
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
    { from, gas: 6000000 },
  );

  const orderId = path(["logs", 0, "args", "id"], receipt);

  if (!receipt || !orderId)
    throw new Error(`Error with makeOrder: ${JSON.stringify(receipt)}`);
  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrder;
