// @flow
import BigNumber from "bignumber.js";

import ensure from "../../utils/generic/ensure";
import findEventInLog from "../../utils/ethereum/findEventInLog";
import getAddress from "../../assets/utils/getAddress";
import getBalance from "../../assets/calls/getBalance";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
import getFundContract from "../contracts/getFundContract";
import getOrder from "../../exchange/calls/getOrder";
import isMakePermitted from "../../riskManagement/calls/isMakePermitted";
import sendTransaction from "../../utils/parity/sendTransaction";
import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import type { Address } from "../../assets/schemas/Address";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";
import type { Order } from "../../exchange/schemas/Order";

const makeOrder = async (
  wallet,
  fundAddress: Address,
  sellWhichToken: TokenSymbol,
  buyWhichToken: TokenSymbol,
  sellHowMuch: BigNumber,
  buyHowMuch: BigNumber,
  from: Address = setup.defaultAccount,
): Promise<Order> => {
  const sellTokenBalance = await getBalance(sellWhichToken, fundAddress);
  ensure(
    sellTokenBalance.gte(sellHowMuch),
    `Insufficient balance of ${sellWhichToken}`,
  );

  const datafeedContract = await getDataFeedContract();
  const isDataValid = await datafeedContract.instance.existsData.call({}, [
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
  ]);
  ensure(isDataValid, "Pricefeed data is outdated :( Please try again.");

  const fundContract = await getFundContract(fundAddress);

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, "Fund is shut down");

  const owner = await fundContract.instance.owner.call();
  ensure(owner.toLowerCase() === from.toLowerCase(), "Not owner of fund");

  const quantityHeldInCustodyOfExchange = await fundContract.instance.quantityHeldInCustodyOfExchange.call(
    {},
    [getAddress(sellWhichToken)],
  );

  ensure(
    quantityHeldInCustodyOfExchange.eq(new BigNumber(0)),
    `Only one open order is allowed per asset. Please wait or cancel your existing open order on ${sellWhichToken}`,
  );

  const isAllowed = await isMakePermitted({
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
  });

  ensure(isAllowed, "Risk Management module doesn't allow this trade");

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
    wallet,
    {},
    from,
  );
  const updateLog = findEventInLog("OrderUpdated", receipt);
  const orderId = updateLog.params.id.value;

  const createdOrder = await getOrder(orderId);
  return createdOrder;
};

export default makeOrder;
