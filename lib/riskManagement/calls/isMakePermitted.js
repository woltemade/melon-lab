import getRiskManagementContract from "../contracts/getRiskManagementContract";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
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
  const datafeedContract = await getDataFeedContract();

  const baseToken = sellWhichToken === "MLN-T" ? buyWhichToken : sellWhichToken;

  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    getAddress(baseToken),
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
