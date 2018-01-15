import getRiskManagementContract from "../contracts/getRiskManagementContract";
import getPriceFeedContract from "../../pricefeeds/contracts/getPriceFeedContract";
import getAddress from "../../assets/utils/getAddress";
import toProcessable from "../../assets/utils/toProcessable";

/**
 * Test if make order request is permitted
 */
const isMakePermitted = async ({
  referencePrice,
  sellWhichToken,
  buyWhichToken,
  sellHowMuch,
  buyHowMuch,
}) => {
  const priceFeedContract = await getPriceFeedContract();

  const baseToken = sellWhichToken === "MLN-T" ? buyWhichToken : sellWhichToken;

  const orderPrice = await priceFeedContract.instance.getOrderPrice.call({}, [
    getAddress(sellWhichToken),
    getAddress(buyWhichToken),
    toProcessable(sellHowMuch, sellWhichToken),
    toProcessable(buyHowMuch, buyWhichToken),
  ]);

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
