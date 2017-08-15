// @flow
import BigNumber from "bignumber.js";
import { path } from "ramda";

import getExchangeContract from "../contracts/getExchangeContract";
import getOrder from "../calls/getOrder";
import removeDecimals from "../../assets/utils/removeDecimals";
import getAddress from "../../assets/utils/getAddress";
import setup from "../../utils/setup";

const makeOrder = async (
  sellHowMuch: BigNumber,
  sellWhichToken: string,
  buyHowMuch: BigNumber,
  buyWhichToken: string,
  from: string = setup.web3.eth.accounts[0],
) => {
  const exchangeContract = await getExchangeContract();

  const receipt = await exchangeContract.make(
    removeDecimals(sellHowMuch, sellWhichToken),
    getAddress(sellWhichToken),
    removeDecimals(buyHowMuch, buyWhichToken),
    getAddress(buyWhichToken),
    { from },
  );

  const orderId = path(["logs", 0, "args", "id"], receipt);

  if (!receipt || !orderId)
    throw new Error(`Error with makeOrder: ${JSON.stringify(receipt)}`);

  return getOrder(orderId);
};

export default makeOrder;
