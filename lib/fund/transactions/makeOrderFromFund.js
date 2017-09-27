// @flow
import BigNumber from "bignumber.js";
import contract from "truffle-contract";

import FundJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";
import getOrder from "../../exchange/calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";
import findEventInLog from "../../utils/findEventInLog";

const makeOrderFromFund = async (
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

  const args = [
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
    // sellHowMuch,
    // buyHowMuch,
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
    { from },
  ];

  // const gasEstimation = await fundContract.makeOrder.estimateGas(
  //   getAddress(sellWhichToken),
  //   getAddress(buyWhichToken),
  //   toProcessable(sellHowMuch, sellWhichToken),
  //   toProcessable(buyHowMuch, buyWhichToken),
  // );

  // console.log("Gas estimation -----", gasEstimation);

  // args.push({ from, gas: Math.ceil(gasEstimation * 1.2) });

  const receipt = await fundContract.makeOrder(...args);

  const updateLog = findEventInLog("OrderUpdated", receipt);
  const orderId = updateLog.args.id;

  if (!receipt || !orderId)
    throw new Error(`Error with makeOrder: ${JSON.stringify(receipt)}`);
  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrderFromFund;
