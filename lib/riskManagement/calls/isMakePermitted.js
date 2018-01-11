import getRiskManagementContract from "../contracts/getRiskManagementContract";
import getPriceFeedContract from "../../datafeeds/contracts/getPriceFeedContract";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";

/**
 * Test if make order request is permitted
 */
const isMakePermitted = async ({
  sellWhichToken,
  buyWhichToken,
  sellHowMuch,
  buyHowMuch,
}) => {
  const datafeedContract = await getPriceFeedContract();

  const baseToken = sellWhichToken === "MLN-T" ? buyWhichToken : sellWhichToken;

  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    getAddress(sellWhichToken),
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
  ]);
  const referencePrice = await datafeedContract.instance.getReferencePrice.call(
    {},
    [getAddress(sellWhichToken), getAddress(buyWhichToken)],
  );
  const riskManagementContract = await getRiskManagementContract();

  const result = await riskManagementContract.instance.isMakePermitted.call(
    {},
    [
      orderPrice,
      referencePrice,
      getAddress(sellWhichToken),
      getAddress(buyWhichToken),
      toProcessable(sellHowMuch, sellWhichToken),
      toProcessable(buyHowMuch, buyWhichToken),
    ],
  );
  return result;
};

export default isMakePermitted;
