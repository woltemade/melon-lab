// @flow
import BigNumber from "bignumber.js";
import { path } from "ramda";

import getExchangeContract from "../contracts/getExchangeContract";
import getOrder from "../calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";
import setup from "../../utils/setup";

const makeOrder = async (
  sellHowMuch: BigNumber,
  sellWhichToken: string,
  buyHowMuch: BigNumber,
  buyWhichToken: string,
  from: string = setup.defaultAccount,
) => {
  const exchangeContract = await getExchangeContract();

  const receipt = await exchangeContract.make(
    toProcessable(sellHowMuch, sellWhichToken),
    getAddress(sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
    getAddress(buyWhichToken),
    { from },
  );

  const orderId = path(["logs", 0, "args", "id"], receipt);

  if (!receipt || !orderId)
    throw new Error(`Error with makeOrder: ${JSON.stringify(receipt)}`);

  return getOrder(orderId);
};

export default makeOrder;
