import BigNumber from "bignumber.js";
import { path } from "ramda";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import setup from "../../utils/setup";
import getOrder from "../../exchange/calls/getOrder";
import toProcessable from "../../assets/utils/toProcessable";
import getAddress from "../../assets/utils/getAddress";
import approve from "../../assets/transactions/approve";
import depositAndApproveEther from "../../participation/transactions/depositAndApproveEther";

const makeOrder = async (
  sellHowMuch,
  sellWhichToken,
  buyHowMuch,
  buyWhichToken,
  from = setup.defaultAccount,
) => {
  const simpleMarketContract = await getSimpleMarketContract();

  if (sellWhichToken === "ETH-T") {
    await depositAndApproveEther(
      from,
      simpleMarketContract.address,
      sellHowMuch,
      sellWhichToken,
    );
  } else {
    await approve(
      sellWhichToken,
      simpleMarketContract.address,
      toProcessable(sellHowMuch, sellWhichToken),
    );
  }

  const receipt = await simpleMarketContract.offer(
    toProcessable(sellHowMuch, sellWhichToken),
    getAddress(sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
    getAddress(buyWhichToken),
    { from, gas: 6000000 },
  );

  const orderId = path(["logs", 0, "args", "id"], receipt);

  if (!receipt || !orderId)
    throw new Error(
      `Error with make on Simple Market: ${JSON.stringify(receipt)}`,
    );
  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrder;
