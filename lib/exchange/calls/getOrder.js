import addDecimals from "../../assets/utils/addDecimals";
import getSymbol from "../../assets/utils/getSymbol";

import getExchangeContract from "../contracts/getExchangeContract";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = async id => {
  const exchangeContract = await getExchangeContract();
  const order = await exchangeContract.orders(id);

  const [
    sellHowMuch,
    sellWhichToken,
    buyHowMuch,
    buyWhichToken,
    timestamp,
    owner,
    isActive,
  ] = order;

  const enhancedOrder = {
    id,
    owner,
    isActive,
    timestamp,
  };

  // inactive orders have token set to 0x0000... so only enhance active orders
  if (isActive) {
    const sellSymbol = getSymbol(sellWhichToken);
    const buySymbol = getSymbol(buyWhichToken);

    enhancedOrder.sell = {
      symbol: sellSymbol,
      howMuch: addDecimals(sellHowMuch, sellSymbol),
    };

    enhancedOrder.buy = {
      symbol: buySymbol,
      howMuch: addDecimals(buyHowMuch, buySymbol),
    };
  }

  return enhancedOrder;
};

export default getOrder;
