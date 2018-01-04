import getRiskManagementContract from "../contracts/getRiskManagementContract";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
import getAddress from "../../assets/utils/getAddress";
import getOrder from "../../exchange/calls/getOrder";

/**
 * Test if make order request is permitted
 */
const isTakePermitted = async orderId => {
  const order = await getOrder(orderId);

  const sellWhichToken = getAddress(order.sell.symbol);
  const buyWhichToken = getAddress(order.buy.symbol);
  const buyHowMuch = order.buy.howMuch;
  const sellHowMuch = order.sell.howMuch;

  const datafeedContract = await getDataFeedContract();
  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    sellWhichToken,
    buyHowMuch,
    sellHowMuch,
  ]);
  const referencePrice = await datafeedContract.instance.getReferencePrice.call(
    {},
    [buyWhichToken, sellWhichToken],
  );
  const riskManagementContract = await getRiskManagementContract();

  const result = await riskManagementContract.instance.isTakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      sellWhichToken,
      buyWhichToken,
      sellHowMuch,
      buyHowMuch,
    ],
  );
  console.log("RM Module returned : ", result);
  return result;
};

export default isTakePermitted;
