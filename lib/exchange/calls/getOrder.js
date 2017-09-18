import toReadable from "../../assets/utils/toReadable";
import getSymbol from "../../assets/utils/getSymbol";

import getSimpleMarketContract from "../contracts/getSimpleMarketContract";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = async id => {
  const exchangeContract = await getSimpleMarketContract();
  const isActive = await exchangeContract.isActive(id);
  const owner = await exchangeContract.getOwner(id);
  const order = await exchangeContract.offers(id);
  const [sellHowMuch, sellWhichToken, buyHowMuch, buyWhichToken] = order;

  const enhancedOrder = {
    id,
    owner,
    isActive,
  };

  // inactive orders have token set to 0x0000... so only enhance active orders
  if (isActive) {
    const sellSymbol = getSymbol(sellWhichToken);
    const buySymbol = getSymbol(buyWhichToken);

    enhancedOrder.sell = {
      symbol: sellSymbol,
      howMuch: toReadable(sellHowMuch, sellSymbol),
    };

    enhancedOrder.buy = {
      symbol: buySymbol,
      howMuch: toReadable(buyHowMuch, buySymbol),
    };
  }

  return enhancedOrder;
};

export default getOrder;
