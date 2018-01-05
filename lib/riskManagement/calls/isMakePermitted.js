import getRiskManagementContract from "../contracts/getRiskManagementContract";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";
import getAddress from "../../assets/utils/getAddress";

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
  const orderPrice = await datafeedContract.instance.getOrderPrice.call({}, [
    getAddress(sellWhichToken),
    sellHowMuch,
    buyHowMuch,
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
      sellHowMuch,
      buyHowMuch,
    ],
  );
  return result;
};

export default isMakePermitted;
